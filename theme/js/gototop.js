function gototo(){
  window.scroll({
    top: 0,
    behavior: "smooth"
  })
  return false
}
function gototop(){
  for(let el of Array.from(document.getElementsByClassName('trigger-gototop'))){
    el.addEventListener('click', gototo)
  }
}

window.addEventListener('DOMContentLoaded', gototop)
document.addEventListener('pjax:content', gototop)