module.exports = (htm) => {
  const highlighter = require('mfmf').syntaxHighlighter
  function fuckescape(val){
    val = val.replace(/&amp;/g, "&") .replace(/&lt;/g, "<") .replace(/&gt;/g, ">") .replace(/&#39;/g, "'") .replace(/&quot;/g, "\"")
    val = val.replace(/&lt;/g, "<") .replace(/&gt;/g, ">") .replace(/&#39;/g, "'") .replace(/&quot;/g, "\"")
    return val
  }

  let $ = require('cheerio').load(htm, {decodeEntities: false})
  $(':not(.mfm) code').each((i, el) => {
    $(el).html(highlighter(fuckescape($(el).text())))
  })
  return $('body').html()
}