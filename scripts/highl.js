const highlighter = require('mfmf').syntaxHighlighter
function fuckescape(val){
  val = val.replace(/&amp;/g, "&") .replace(/&lt;/g, "<") .replace(/&gt;/g, ">") .replace(/&#39;/g, "'") .replace(/&quot;/g, "\"")
  val = val.replace(/&lt;/g, "<") .replace(/&gt;/g, ">") .replace(/&#39;/g, "'") .replace(/&quot;/g, "\"")
  return val
}
module.exports = (htm) => {
  htm = htm.replace(/<pre><code class="(.*?)">([\s\S]*?)<\/code><\/pre>/gi, function(a, l, b){
    b = fuckescape(b)
    if(l.indexOf("lang-") == 0) l = l.slice(5)
    const hled = highlighter(b, l)
    return `<pre><code class="${l}">${hled}</code></pre>`
  } )
  htm = htm.replace(/<pre>\s*?<code>([\s\S]*?)<\/code>\s*?<\/pre>/gi, function(a, b){
    b = fuckescape(b)
    const hled = highlighter(b)
    return `<pre><code class="highlighter border rounded">${hled}</code></pre>`
  }
  )
  return htm
}