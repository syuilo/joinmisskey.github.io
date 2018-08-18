const highlighter = require('mfmf').syntaxHighlighter
function fuckescape(val){
  val = val.replace(/&amp;/g, "&") .replace(/&lt;/g, "<") .replace(/&gt;/g, ">") .replace(/&#39;/g, "'") .replace(/&quot;/g, "\"")
  val = val.replace(/&lt;/g, "<") .replace(/&gt;/g, ">") .replace(/&#39;/g, "'") .replace(/&quot;/g, "\"")
  return val
}
module.exports = (htm) => {
  htm = htm.replace(/<pre class="(.*?)">\s*?<code>([\s\S]*?)<\/code>\s*?<\/pre>/gi, function(a, l, b){
    b = fuckescape(b)
    if(l.indexOf("lang-") == 0) l = l.slice(5)
    const hled = highlighter(b, l)
    return `<pre class="highlighted${l ? ` ${l}` : ''}"><code>${hled}</code></code>`
  } )
  htm = htm.replace(/<code>([\s\S]*?)<\/code>/gi, function(a, b){
    b = fuckescape(b)
    const hled = highlighter(b)
    return `<code class="highlighted">${hled}</code>`
  }
  )
  return htm
}
