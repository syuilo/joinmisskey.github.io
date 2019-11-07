import("bootstrap/js/dist/collapse.js")
import("bootstrap/js/dist/dropdown.js")

import { fainit } from "./fainit"
import { gototop } from "./gototop"
import importCss from "./import-css"
import { detectOldBrowser } from "./old-browsers"
import onLoad from "./onLoad"
import onReady from "./onReady"
import { pjaxinit } from "./pjax"
import { pjaxLoaded } from "./pjax-loaded"
import { scrolltoshow } from "./scrolltoshow"
// import { twemojiinit } from "./twemojiinit"

import { Loading } from "./loading"
import { LoadToShow } from "./loadtoshow"
new Loading()
new LoadToShow()

function contentReady() {
  fainit()
  gototop()
  scrolltoshow()
  importCss()
//  twemojiinit()
}

pjaxinit()

detectOldBrowser()

onReady(contentReady)
document.addEventListener("pjax:content", contentReady)

onLoad(contentLoaded)
window.addEventListener("pjax:load", pjaxLoaded)
window.addEventListener("pjax:load", contentLoaded)
