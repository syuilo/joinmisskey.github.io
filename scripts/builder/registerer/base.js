const util = require('util')
const promisify = util.promisify
const sass = require("node-sass")
const cleanCss = require("clean-css")
const htmlToText = require("html-to-text")
const request = require('request')
const mkdirp = require('mkdirp')
const downloadTemp = require('../../downloadTemp')
const extend = require('extend')
const semver = require('semver')

const fontawesome = require("@fortawesome/fontawesome-svg-core")
fontawesome.library.add(require("@fortawesome/free-solid-svg-icons").fas, require("@fortawesome/free-regular-svg-icons").far, require("@fortawesome/free-brands-svg-icons").fab)
$ = require('gulp-load-plugins')()

const get = promisify(request.get)
const post = promisify(request.post)

async function getContributors(){
    try {
        const res = await get(
            'https://api.github.com/repos/syuilo/misskey/contributors',
            {
                headers: {
                    'User-Agent': 'LuckyBeast'
                },
                json: true
            }
        )
        return res.body
    } catch(e) {
        console.log('Cannot get GitHub contributors')
        console.log(e)
        return null
    }
}

async function getPatrons(patreonUrl, keys){
    try {
        const res = await get(patreonUrl, { headers: { Authorization: `Bearer ${keys.patreon.bearer}` } })
        return JSON.parse(res.body)
    } catch(e) {
        console.log('Cannot get Patreon patrons')
        console.log(e)
        return null
    }
}

async function getAmpCss(){
    let ampcss = ''
    try {
        ampcss += '/*Based on Bootstrap v4.1.3 (https://getbootstrap.com)|Copyright 2011-2018 The Bootstrap Authors|Copyright 2011-2018 Twitter, Inc.|Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)*/\n'
        ampcss += (await promisify(sass.render)({file: 'theme/styl/amp_main.sass'})).css.toString()
        ampcss += '\n'
        ampcss += fontawesome.dom.css()
        ampcss += '\n'
        ampcss = new cleanCss().minify(ampcss).styles.replace(/!important/g,"").replace(/@charset "UTF-8";/g,"").replace(/@-ms-viewport{width:device-width}/g,"")

        $.util.log(`making amp css: ${Buffer.byteLength(ampcss)}Byte`)
    } catch(e) {
        $.util.log($.util.colors.red('making amp css failed'))
        $.util.log($.util.colors.red(e))
        ampcss = "/* oops */"
    }
    return ampcss
}

function safePost(url, options){
    return post(url, options).then(
        res => {
            if (res && res.statusCode == 200) return res
            else return false
        }
    ).catch(e => {
        return false
    })
}

async function getInstancesInfos(instances){
    let metasPromises = [],
        statsPromises = [],
        usersChartsPromises = [],
        notesChartsPromises = [],
        instancesInfos = []
    for (let instance of instances) {
        metasPromises.push(safePost(`https://${instance.url}/api/meta`, { json: true }))
        statsPromises.push(safePost(`https://${instance.url}/api/stats`, { json: true }))
        usersChartsPromises.push(safePost(`https://${instance.url}/api/charts/users`, { json: { span: "day" }}))
        notesChartsPromises.push(safePost(`https://${instance.url}/api/charts/notes`, { json: { span: "day" }}))
    }
    const ress = await Promise.all([
        Promise.all(metasPromises),
        Promise.all(statsPromises),
        Promise.all(usersChartsPromises),
        Promise.all(notesChartsPromises),
    ])
    const metas = ress[0]
    const stats = ress[1]
    const usersCharts = ress[2]
    const notesCharts = ress[3]
    for (let i = 0; i < instances.length; i++) {
        const instance = instances[i]
        const meta = metas[i] ? metas[i].body : false
        const stat = stats[i] ? stats[i].body : false
        const usersChart = usersCharts[i] ? usersCharts[i].body : false
        const notesChart = notesCharts[i] ? notesCharts[i].body : false
        if(metas[i] && stats[i]){
            /*   インスタンスバリューの算出   */
            let value = 0
            // 1. セマンティックバージョニングをもとに並び替え (独自拡張の枝番は除去)
            const v = semver.valid(semver.coerce(meta.version)).split('.')
            value += (Number(v[0]) * 1200 + Number(v[1]) * 12 + Number(v[0]) * 0.75) * 1000
            if(meta.version.split('-').length > 1) value += 100
            // (セマンティックバージョニングに影響があるかないか程度に色々な値を考慮する)
            if(usersChart){
                // 2.
                const arr = usersChart.local.total.filter(e => e !== 0)
                value += ( arr[0] - arr[arr.length - 1] ) / arr.length * 3.0
            }
            if(notesChart){
                // 3.
                const arr = notesChart.local.total.filter(e => e !== 0)
                value += ( arr[0] - arr[arr.length - 1] ) / arr.length * 0.30
            }

            // 4.
            value += Math.log2(stat.originalNotesCount) * 10
            // 5.
            value += stat.originalUsersCount * 0.008
            // 6.
            value += meta.driveCapacityPerLocalUserMb * 0.001

            // 7.
            if(meta.features){
                if(meta.features.elasticsearch) value += 500
                if(meta.features.recaptcha)     value += 500
                if(meta.features.objectStorage) value += 50
                if(meta.features.twitter) meta.features.github ? value += 400 : value += 250
                else                      meta.features.github ? value += 200 : value += 0
                if(meta.features.serviceWorker) value += 150
            }

            instancesInfos.push(extend(true, instance, {
                value,
                meta,
                stats: stat,
                description: metas[i].body.description ? htmlToText.fromString(metas[i].body.description).replace(/\n/g, '<br>') : ( instance.description || false ),
                isAlive: true
            }))
        } else {
            instancesInfos.push(extend(true, { isAlive: false }, instance))
        }
    }
    return instancesInfos.sort((a, b) => {
        if( !a.isAlive && b.isAlive ) return 1
        else if( a.isAlive && !b.isAlive ) return -1
        else if ( a.isAlive && b.isAlive ) return b.value - a.value
        else return ( b.url > a.url ? 1 : -1 )
    })
}

module.exports = async (site, keys, temp_dir, instances) => {
    mkdirp.sync(`${temp_dir}github/`)
    mkdirp.sync(`${temp_dir}patreon/`)
    let promises = []
    const contributors = await getContributors()

    for (let contributor of contributors) {
        promises.push(downloadTemp(`github/${contributor.id}`, contributor.avatar_url, temp_dir))
    }
    console.log('Got contributors from GitHub')

    /* get patrons from Patreon API */

    let patrons = null
    if (keys != null && keys.patreon){
        patrons = []
        patrons.push(
            {
                title: "the Others",
                titles: site.i18n.the_other_backers,
                lv: 0,
                members: []
            }
        )
    
        let patreonUrl = `https://www.patreon.com/api/oauth2/v2/campaigns/${keys.patreon.campaign}/members?include=currently_entitled_tiers,user&fields%5Bmember%5D=currently_entitled_amount_cents&fields%5Btier%5D=title&fields%5Buser%5D=full_name,thumb_url,url,hide_pledges`
        while (patreonUrl) {
            const n = await getPatrons(patreonUrl, keys)
            
            if(n){
                for (let e of n.data) {
                    if (e.attributes.currently_entitled_amount_cents == 0) continue
                    const cet = e.relationships.currently_entitled_tiers
                    const tierLv = cet.data.length
                    for (i = patrons.length - 1; i < tierLv; i++) {
                        const tier = n.included.find((g) => g.id == cet.data[i].id && g.type == 'tier')
                        patrons.push({
                            title: tier.attributes.title,
                            lv: tierLv,
                            members: []
                        })
                    }
                    const patron = n.included.find((g) => g.id == e.relationships.user.data.id && g.type == 'user')
                    patron.currently_entitled_amount_cents = e.attributes.currently_entitled_amount_cents
                    patrons[tierLv].members.push(patron)
                }
                if (n.links) patreonUrl = n.links.next; else patreonUrl = null
            } else {
                patreonUrl = null
            }
        }
        console.log('Got patrons from Patreon')
        for (let tier of patrons) {
            for (let member of tier.members) {
                promises.push(downloadTemp(`patreon/${member.id}`, member.attributes.thumb_url, temp_dir))
            }
            tier.members.sort((a, b) => {
                return b.lifetime_support_cents - a.lifetime_support_cents
            })
        }
    
        patrons = patrons.reverse()
    }

    const promises2 = await Promise.all([Promise.all(promises), getInstancesInfos(instances), getAmpCss()])

    const creditIcons = promises2[0]
    const instancesInfos = promises2[1]
    const ampcss = promises2[2]

    return {
        instancesInfos,
        patrons,
        contributors,
        ampcss,
        creditIcons
    }
}
