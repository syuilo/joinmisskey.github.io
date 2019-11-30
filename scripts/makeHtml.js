/* eslint-disable max-len */
const htmlmin = require("html-minifier").minify
const pug = require("pug")
const glog = require("fancy-log")
const marked = require("marked")
const betterMarkdown = require("./better_markdown")
const highl = require("./highl")

function pugit(val, boptions) {
  const options = boptions
  options.isSubcall = true
  const res = pug.render(`${options.themePug.script}\n${options.themePug.mixin}\n${val}`, options)
  return res
}

/*
* pageからhtmlを生成します
*/
module.exports = (page, puglocals, urlPrefix) => {
  let mainHtml
  switch (page.meta.src.ext) {
  case ".md":
    mainHtml = marked(page.body)
    mainHtml = betterMarkdown(mainHtml, urlPrefix, puglocals.site.image_compressing_strategy_version)
    // mainHtml = maly(mainHtml)
    mainHtml = htmlmin(mainHtml, {
      collapseWhitespace: true,
      removeEmptyAttributes: false,
      removeEmptyElements: false
    })
    break
  case ".html":
  case ".htm":
    mainHtml = htmlmin(page.body, {
      collapseWhitespace: true,
      removeEmptyAttributes: false,
      removeEmptyElements: false
    })
    if (page.attributes.improve) mainHtml = betterMarkdown(mainHtml, urlPrefix, puglocals.site.image_compressing_strategy_version)
    break
  case ".pug":
    try {
      mainHtml = pugit(page.body, puglocals)
    } catch (e) {
      glog(`Error @ ${page.meta.permalink}`)
      throw Error(e)
    }
    if (page.attributes.improve) mainHtml = betterMarkdown(mainHtml, urlPrefix, puglocals.site.image_compressing_strategy_version)
    break
  default:
    mainHtml = page.body
    break
  }
  mainHtml = highl(mainHtml)
  return mainHtml
}
