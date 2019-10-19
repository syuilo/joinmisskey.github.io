import("bootstrap/js/dist/collapse")
import("bootstrap/js/dist/dropdown")

import { fainit } from "./fainit"
import { gototop } from "./gototop"
import onLoad from "./onLoad"
import onReady from "./onReady"
import { scrolltoshow } from "./scrolltoshow"

import importCss from "./import-css"
import { loadtoshow } from "./loadtoshow"
import { detectOldBrowser } from "./old-browsers"
import { pjaxinit } from "./pjax"
import { pjaxLoaded } from "./pjax-loaded"

import { Loading } from "./loading"
new Loading()

function contentReady() {
  fainit()
  gototop()
  scrolltoshow()
  importCss()
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
