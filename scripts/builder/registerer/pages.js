const path = require('path')
const fs = require('fs')
const promisify = require('util').promisify
const extend = require('extend')

const getHash = require('../../gethash')
/*
function getTL(val){
    let result
    eval("result = `" + val + "`")
    return result
}

function existFile(file) {
    try {
        fs.statSync(file)
        return true
    } catch(e) {
        if(e.code === 'ENOENT') return false
    }
}

function searchSidebar(pathe){
    let searchin
    if(pathe.dir == "") searchin = `${pathe.dir}sidebar.pug`
    else searchin = `${pathe.dir}/sidebar.pug`
    if(existFile(searchin)){
        return searchin
    } else {
        const uppath = path.parse(pathe.dir)
        searchSidebar(uppath)
        return "pages/ja/sidebar.pug"
    }
}
*/
module.exports = async (site, src, urlPrefix) => {
    let promises = []
    const srcs = require('glob').sync(src.pages)
    for(p = 0; p < srcs.length; p++){
        promises.push(
            doit(srcs[p], p, srcs, path.parse(site.pages_src.path))
        )
    }
    let result = await Promise.all(promises)
    result = result.filter( (el, i, arr) => !!el )
    return result
    async function doit(val, i, arr, srcpath){
        let page = {}
        const src = path.parse(val)

        if(src.name == "sidebar") return false   // - - - - - - - -  名前がsidebarのとき弾く */ 
        let subdir = src.dir.replace(srcpath.base, '')
        if(subdir.indexOf('/') == 0) subdir = subdir.slice(1)
        if ( !subdir ) subdir = ''

        let file = await promisify(fs.readFile)( val, 'utf-8' )
        page = extend(true,page,require('front-matter')(file))

        page.meta = {}
        page.meta.src = src
        page.meta.src.subdir = subdir

        page.meta.hash = {}
        page.meta.hash.md5 = getHash(file, 'md5', 'binary', 'hex')
        page.meta.hash.sha384 = getHash(file, 'sha384', 'binary', 'base64')
        page.stats = await promisify(fs.stat)(val)

        page.body = page.body.replace(/\r\n?/gi,"\n") // 文字コードをLFにそろえる
        delete page.frontmatter

        page.attributes.title = page.attributes.title || page.meta.srcname || null
        page.attributes.description = page.attributes.description || ""
        page.meta.mtime = (new Date(page.attributes.mtime || page.attributes.date || page.stats.mtime)).toJSON()
        page.meta.birthtime = (new Date(page.attributes.birthtime || page.stats.birthtime)).toJSON()

        page.meta.thumbnail = page.attributes.thumbnail ? path.parse(page.attributes.thumbnail) : null

        if( page.attributes.permalink === undefined || page.attributes.permalink === null ) {
            if(subdir != '') page.meta.permalink = `/${subdir}/${page.meta.src.name}`
            else page.meta.permalink = `/${page.meta.src.name}`
        } else { page.meta.permalink = page.attributes.permalink }
        if( page.meta.permalink.indexOf('/') != 0 ) page.meta.permalink = '/' + page.meta.permalink
        if( page.meta.permalink.lastIndexOf('index') == page.meta.permalink.length - 5 && page.meta.permalink.indexOf('index') != -1 ) page.meta.permalink = page.meta.permalink.slice(0,-5)
        else if( page.meta.permalink.lastIndexOf('/') != page.meta.permalink.length - 1 ) page.meta.permalink = page.meta.permalink + '/'


        page.meta.dirs = page.meta.permalink.split("/")
        page.meta.locale = (page.meta.dirs.length < 3 || page.meta.dirs[1] == "404") ? false : page.meta.dirs[1]
        page.meta.url = require('url').parse(`${urlPrefix}${page.meta.permalink}`)

        if( page.attributes.layout === undefined || page.attributes.layout === null ) page.attributes.layout = 'default'
        if( page.attributes.published === undefined || page.attributes.published === null ) page.attributes.published = true
        if( page.attributes.draft === undefined || page.attributes.draft === null ) page.attributes.draft = false

        if( typeof page.attributes.categories === 'string' ) page.attributes.categories = page.attributes.categories.split(' ')
        if( typeof page.attributes.tags === 'string' ) page.attributes.tags = page.attributes.tags.split(' ')
        if( typeof page.attributes.category === 'string' ){
            page.attributes.categories = page.attributes.category.split(' ')
            delete page.attributes.category
        }
        if( typeof page.attributes.tag === 'string' ){
            page.attributes.tags = page.attributes.tag.split(' ')
            delete page.attributes.tag
        }

        return page
    }
}