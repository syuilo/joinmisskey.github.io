import("bootstrap/js/dist/collapse")
import("bootstrap/js/dist/dropdown")

import { fainit } from "./fainit"
import { gototop } from "./gototop"
import { katexinit } from "./katexinit"
import onLoad from "./onLoad"
import onReady from "./onReady"
import { scrolltoshow } from "./scrolltoshow"

import importCss from "./import-css"
import { loadtoshow } from "./loadtoshow"
import { detectOldBrowser } from "./old-browsers"
import { pjaxinit } from "./pjax"
import { pjaxLoaded } from "./pjax-loaded"

function contentReady() {
  fainit()
  gototop()
  katexinit()
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

const ini = document.getElementById("ini")

window.addEventListener("pjax:fetch", () => {
  ini.classList.remove("hide")
  ini.classList.add("show")
})

window.addEventListener("pjax:load", () => {
  ini.classList.remove("show")
  ini.classList.add("hide")
})

window.addEventListener("load", () => {
  ini.classList.add("hide")
})
