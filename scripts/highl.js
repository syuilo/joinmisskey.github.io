const hljs = require('highlight.js')
function fuckescape(val){
  val = val.replace(/&amp;/g, "&") .replace(/&lt;/g, "<") .replace(/&gt;/g, ">") .replace(/&#39;/g, "'") .replace(/&quot;/g, "\"")
  val = val.replace(/&lt;/g, "<") .replace(/&gt;/g, ">") .replace(/&#39;/g, "'") .replace(/&quot;/g, "\"")
  return val
}
module.exports = (htm) => {
  htm = htm.replace(/<pre><code class="(.*?)">([\s\S]*?)<\/code><\/pre>/gi, function(a, l, b){
    b = fuckescape(b)
    if(l.indexOf("lang-") == 0) l = l.slice(5)
    try {
      const hled = hljs.highlight(l, b)
      return `<pre><code class="${l}">${hled.value}</code></pre>`
    } catch(e) {
      messenger("hljs", messages.hljs_langerr)
      const hled = hljs.highlightAuto(b)
      return `<pre><code class="hljs ${hled.language} border rounded">${hled.value}</code></pre>`
    }
  } )
  htm = htm.replace(/<pre>\s*?<code>([\s\S]*?)<\/code>\s*?<\/pre>/gi, function(a, b){
    b = fuckescape(b)
    const hled = hljs.highlightAuto(b)
    return `<pre><code class="hljs ${hled.language} border rounded">${hled.value}</code></pre>`
  }
  )
  return htm
}