const { syntaxHighlighter } = require("mfmf")
const cheerio = require("cheerio")

module.exports = (htm) => {
  function fuckescape(val) {
    let res = val.replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, "\"")
    res = res.replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, "\"")
    return res
  }

  const $ = cheerio.load(htm, { decodeEntities: false })
  $(":not(.mfm) code").each((i, el) => {
    $(el).html(syntaxHighlighter(fuckescape($(el).text())))
  })
  return $("body").html()
}
