import("bootstrap/js/dist/collapse")
import("bootstrap/js/dist/dropdown")

import { fainit } from "./fainit"
import { gototop } from "./gototop"
import importCss from "./import-css"
import { loadtoshow } from "./loadtoshow"
import { detectOldBrowser } from "./old-browsers"
import onLoad from "./onLoad"
import onReady from "./onReady"
import { pjaxinit } from "./pjax"
import { pjaxLoaded } from "./pjax-loaded"
import { scrolltoshow } from "./scrolltoshow"
// import { twemojiinit } from "./twemojiinit"

import { Loading } from "./loading"
new Loading()

function contentReady() {
  fainit()
  gototop()
  scrolltoshow()
  importCss()
//  twemojiinit()
}

function contentLoaded() {
  loadtoshow()
}

pjaxinit()

detectOldBrowser()

onReady(contentReady)
document.addEventListener("pjax:content", contentReady)

onLoad(contentLoaded)
window.addEventListener("pjax:load", pjaxLoaded)
window.addEventListener("pjax:load", contentLoaded)
