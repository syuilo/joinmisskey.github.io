/* eslint-disable max-len */
const mkConnectServices = ["Twitter", "GitHub", "Discord"]

const { promisify } = require("util")
const sass = require("node-sass")
const CleanCss = require("clean-css")
const htmlToText = require("html-to-text")
const request = require("request")
const mkdirp = require("mkdirp")
const extend = require("extend")
const semver = require("semver")
const glog = require("fancy-log")
const colors = require("colors")

const fontawesome = require("@fortawesome/fontawesome-svg-core")
const downloadTemp = require("../../downloadTemp")
fontawesome.library.add(require("@fortawesome/free-solid-svg-icons").fas, require("@fortawesome/free-regular-svg-icons").far, require("@fortawesome/free-brands-svg-icons").fab)

const get = promisify(request.get)
const post = promisify(request.post)

async function getContributors() {
  try {
    const res = await get(
      "https://api.github.com/repos/syuilo/misskey/contributors",
      {
        headers: {
          "User-Agent": "LuckyBeast"
        },
        json: true
      }
    )
    return res.body
  } catch (e) {
    glog("Cannot get GitHub contributors")
    glog(e)
    return null
  }
}

async function getPatrons(patreonUrl, keys) {
  try {
    const res = await get(patreonUrl, { headers: { Authorization: `Bearer ${keys.patreon.bearer}` } })
    return JSON.parse(res.body)
  } catch (e) {
    glog("Cannot get Patreon patrons")
    glog(e)
    return null
  }
}

async function getAmpCss() {
  let ampcss = ""
  try {
    ampcss += "/*Based on Bootstrap v4.1.3 (https://getbootstrap.com)|Copyright 2011-2018 The Bootstrap Authors|Copyright 2011-2018 Twitter, Inc.|Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)*/\n"
    ampcss += (await promisify(sass.render)({ file: "theme/styl/amp_main.sass" })).css.toString()
    ampcss += "\n"
    ampcss += fontawesome.dom.css()
    ampcss += "\n"
    ampcss = new CleanCss().minify(ampcss).styles.replace(/!important/g, "").replace(/@charset "UTF-8";/g, "").replace(/@-ms-viewport{width:device-width}/g, "")

    glog(`making amp css: ${Buffer.byteLength(ampcss)}Byte`)
  } catch (e) {
    glog(colors.red("making amp css failed"))
    glog(colors.red(e))
    ampcss = "/* oops */"
  }
  return ampcss
}

function safePost(url, options) {
  return post(url, options).then(
    (res) => {
      if (res && res.statusCode === 200) return res
      return false
    }
  ).catch(() => false)
}

async function getInstancesInfos(instances) {
  const metasPromises = []
  const statsPromises = []
  const usersChartsPromises = []
  const notesChartsPromises = []
  const instancesInfos = []
  // eslint-disable-next-line no-restricted-syntax
  for (const instance of instances) {
    metasPromises.push(safePost(`https://${instance.url}/api/meta`, { json: true }))
    statsPromises.push(safePost(`https://${instance.url}/api/stats`, { json: true }))
    usersChartsPromises.push(safePost(`https://${instance.url}/api/charts/users`, { json: { span: "day" } }))
    notesChartsPromises.push(safePost(`https://${instance.url}/api/charts/notes`, { json: { span: "day" } }))
  }
  const [
    metas,
    stats,
    usersCharts,
    notesCharts
  ] = await Promise.all([
    Promise.all(metasPromises),
    Promise.all(statsPromises),
    Promise.all(usersChartsPromises),
    Promise.all(notesChartsPromises)
  ])

  for (let i = 0; i < instances.length; i += 1) {
    const instance = instances[i]
    const meta = metas[i] ? metas[i].body : false
    const stat = stats[i] ? stats[i].body : false
    const usersChart = usersCharts[i] ? usersCharts[i].body : false
    const notesChart = notesCharts[i] ? notesCharts[i].body : false
    if (metas[i] && stats[i]) {
      /*   インスタンスバリューの算出   */
      let value = 0
      // 1. セマンティックバージョニングをもとに並び替え (独自拡張の枝番は除去)
      const v = semver.valid(semver.coerce(meta.version))
      const varr = v.split(".")
      value += (Number(varr[0]) * 16 * 150 + Number(varr[1]) * 16 + Number(varr[0])) * 750
      if (meta.version.split("-").length > 1) value += 5
      // (セマンティックバージョニングに影響があるかないか程度に色々な値を考慮する)
      if (usersChart) {
        // 2.
        const arr = usersChart.local.total.filter(e => e !== 0)
        value += (arr[0] - arr[arr.length - 1]) / arr.length * 15
      }
      if (notesChart) {
        // 3.
        const arr = notesChart.local.total.filter(e => e !== 0)
        value += (arr[0] - arr[arr.length - 1]) / arr.length * 0.6
      }

      // 4.
      value += stat.originalNotesCount > 0 ? Math.log10(stat.originalNotesCount) * 7 : 0
      // 5.
      value += stat.originalUsersCount > 0 ? Math.log2(stat.originalUsersCount) * 1 : 0
      // 6.
      value += meta.driveCapacityPerLocalUserMb > 0 ? Math.log10(meta.driveCapacityPerLocalUserMb) * 10 : 0

      // 7.
      if (meta.features) {
        if (meta.features.elasticsearch) value += 64
        if (meta.features.recaptcha) value += 64
        if (meta.features.objectStorage) value += 32
        let v2 = 0
        // eslint-disable-next-line no-restricted-syntax
        for (const service of mkConnectServices) { if (meta.features[service.toLowerCase()]) { v2 += 16 } }
        if (v2 > 0) value += v2 + 16
        if (meta.features.serviceWorker) value += 16
      }

      instancesInfos.push(extend(true, instance, {
        value,
        meta,
        stats: stat,
        description: metas[i].body.description ? htmlToText.fromString(metas[i].body.description).replace(/\n/g, "<br>") : (instance.description || false),
        isAlive: true
      }))
    } else {
      instancesInfos.push(extend(true, { isAlive: false, value: 0 }, instance))
    }
  }
  return instancesInfos.sort((a, b) => {
    if (!a.isAlive && b.isAlive) return 1
    if (a.isAlive && !b.isAlive) return -1
    if (a.isAlive && b.isAlive) return (b.value || 0) - (a.value || 0)
    return (b.url > a.url ? -1 : 1)
  })
}

module.exports = async (site, keys, tempDir, instances) => {
  mkdirp.sync(`${tempDir}github/`)
  mkdirp.sync(`${tempDir}patreon/`)
  const promises = []
  const contributors = await getContributors()

  // eslint-disable-next-line no-restricted-syntax
  for (const contributor of contributors) {
    promises.push(downloadTemp(`github/${contributor.id}`, contributor.avatar_url, tempDir))
  }
  glog("Got contributors from GitHub")

  /* get patrons from Patreon API */

  let patrons = null
  if (keys != null && keys.patreon) {
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
      // eslint-disable-next-line no-await-in-loop
      const n = await getPatrons(patreonUrl, keys)

      if (n) {
        // eslint-disable-next-line no-restricted-syntax
        for (const e of n.data) {
          // eslint-disable-next-line no-continue
          if (e.attributes.currently_entitled_amount_cents === 0) continue
          const cet = e.relationships.currently_entitled_tiers
          const tierLv = cet.data.length
          for (let i = patrons.length - 1; i < tierLv; i += 1) {
            const tier = n.included.find(g => g.id === cet.data[i].id && g.type === "tier")
            patrons.push({
              title: tier.attributes.title,
              lv: tierLv,
              members: []
            })
          }
          const patron = n.included.find(g => g.id === e.relationships.user.data.id && g.type === "user")
          patron.currently_entitled_amount_cents = e.attributes.currently_entitled_amount_cents
          patrons[tierLv].members.push(patron)
        }
        if (n.links) patreonUrl = n.links.next; else patreonUrl = null
      } else {
        patreonUrl = null
      }
    }
    glog("Got patrons from Patreon")
    // eslint-disable-next-line no-restricted-syntax
    for (const tier of patrons) {
      // eslint-disable-next-line no-restricted-syntax
      for (const member of tier.members) {
        promises.push(downloadTemp(`patreon/${member.id}`, member.attributes.thumb_url, tempDir))
      }
      tier.members.sort((a, b) => b.lifetime_support_cents - a.lifetime_support_cents)
    }

    patrons = patrons.reverse()
  }

  const [creditIcons, instancesInfos, ampcss] = await Promise.all([Promise.all(promises), getInstancesInfos(instances), getAmpCss()])

  return {
    instancesInfos,
    patrons,
    contributors,
    ampcss,
    creditIcons,
    mkConnectServices
  }
}
