function gototop(){
  window.scroll({
    top: 0,
    behavior: "smooth"
  })
  return false
}
function addListenerGotoTop(){
  Array.prototype.forEach.call(document.getElementsByClassName('trigger-gototop'), function(el){el.addEventListener('click', gototop)})
}
window.addEventListener('DOMContentLoaded', addListenerGotoTop)
window.addEventListener('pjax:load', addListenerGotoTop)