const path = require("path")
const fs = require("fs")
const { promisify } = require("util")
const extend = require("extend")
const glob = require("glob")
const frontMatter = require("front-matter")
const url = require("url")

function isMetaPage(site, permalink) {
  return site.metaPages.some((i) => permalink === `/${i}/`)
}

module.exports = (site, src, urlPrefix) => {
  const promises = []
  const srcs = glob.sync(src.pages)

  async function doit(val, i, arr, srcpath) {
    let page = {}
    const srcp = path.parse(val)

    if (srcp.name === "sidebar") return false // 名前がsidebarのとき弾く
    let subdir = srcp.dir.replace(srcpath.base, "")
    if (subdir.indexOf("/") === 0) subdir = subdir.slice(1)
    if (!subdir) subdir = ""

    const file = await promisify(fs.readFile)(val, "utf-8")
    page = extend(true, page, frontMatter(file))

    page.meta = {}
    page.meta.src = srcp
    page.meta.src.subdir = subdir

    page.stats = await promisify(fs.stat)(val)

    page.body = page.body.replace(/\r\n?/gi, "\n") // 文字コードをLFにそろえる
    delete page.frontmatter

    page.attributes.title = page.attributes.title || page.meta.srcname || null
    page.attributes.description = page.attributes.description || ""
    page.meta.mtime = (
      new Date(page.attributes.mtime || page.attributes.date || page.stats.mtime)
    ).toJSON()
    page.meta.birthtime = (new Date(page.attributes.birthtime || page.stats.birthtime)).toJSON()

    page.meta.thumbnail = page.attributes.thumbnail ? path.parse(page.attributes.thumbnail) : null

    if (page.attributes.permalink === undefined || page.attributes.permalink === null) {
      if (subdir !== "") page.meta.permalink = `/${subdir}/${page.meta.src.name}`
      else page.meta.permalink = `/${page.meta.src.name}`
    } else { page.meta.permalink = page.attributes.permalink }
    if (page.meta.permalink.indexOf("/") !== 0) page.meta.permalink = `/${page.meta.permalink}`
    if (page.meta.permalink.lastIndexOf("index") === page.meta.permalink.length - 5 && page.meta.permalink.indexOf("index") !== -1) {
      page.meta.permalink = page.meta.permalink.slice(0, -5)
    } else if (page.meta.permalink.lastIndexOf("/") !== page.meta.permalink.length - 1) {
      page.meta.permalink = `${page.meta.permalink}/`
    }

    page.meta.dirs = page.meta.permalink.split("/")
    page.meta.url = url.parse(`${urlPrefix}${page.meta.permalink}`)
    page.meta.locale = (page.meta.dirs.length < 3 || isMetaPage(site, page.meta.permalink))
      ? false : page.meta.dirs[1]

    if (page.attributes.layout === undefined || page.attributes.layout === null) {
      page.attributes.layout = "default"
    }
    if (page.attributes.published === undefined || page.attributes.published === null) {
      page.attributes.published = true
    }
    if (page.attributes.draft === undefined || page.attributes.draft === null) {
      page.attributes.draft = false
    }

    if (typeof page.attributes.categories === "string") page.attributes.categories = page.attributes.categories.split(" ")
    if (typeof page.attributes.tags === "string") page.attributes.tags = page.attributes.tags.split(" ")
    if (typeof page.attributes.category === "string") {
      page.attributes.categories = page.attributes.category.split(" ")
      delete page.attributes.category
    }
    if (typeof page.attributes.tag === "string") {
      page.attributes.tags = page.attributes.tag.split(" ")
      delete page.attributes.tag
    }

    if (!page.attributes.styleRequires) {
      page.attributes.styleRequires = []
    }
    return page
  }

  for (let p = 0; p < srcs.length; p += 1) {
    promises.push(
      doit(srcs[p], p, srcs, path.parse(site.pages_src.path))
    )
  }
  return Promise.all(promises).then((r) => r.filter((el) => el))
}
