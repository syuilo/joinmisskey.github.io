
const htmlmin = require("html-minifier").minify
const betterMarkdown = require('./better_markdown')
const pug = require('pug')
const glog = require('fancy-log')

function pugit(val, options){
    options.isSubcall = true
    const res = pug.render(`${options.theme_pug.script}\n${options.theme_pug.mixin}\n${val}`, options)
    return res
}

module.exports = (page, puglocals, urlPrefix) => {
    let main_html
    switch(page.meta.src.ext){
        case '.md':
            main_html = require("kramed")(page.body)
            main_html = betterMarkdown(main_html, urlPrefix)
            // main_html = maly(main_html)
            main_html = htmlmin(main_html ,{"collapseWhitespace": true,"removeEmptyAttributes": false,"removeEmptyElements": false})
            break
        case '.html':
        case '.htm':
            main_html = htmlmin(page.body ,{"collapseWhitespace": true,"removeEmptyAttributes": false,"removeEmptyElements": false})
            break
        case '.pug':
            try {
                main_html = pugit(page.body, puglocals)
            } catch(e) {
                glog(`Error: ${page.meta.permalink}`)
                throw Error(e)
            }
            if (page.attributes.improve) main_html = betterMarkdown(main_html, urlPrefix)
            break
    }
    main_html = require('./highl')(main_html)
    return main_html
}