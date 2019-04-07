import("bootstrap/js/dist/collapse")
import("bootstrap/js/dist/dropdown")

import { fainit } from "./fainit"
import { gototop } from "./gototop"
import { katexinit } from "./katexinit"
import onLoad from "./onLoad"
import onReady from "./onReady"
import { scrolltoshow } from "./scrolltoshow"

import { detectOldBrowser } from "./old-browsers"
import { pjaxinit } from "./pjax"
import { pjaxLoaded } from "./pjax-loaded"

function contentReady() {
  fainit()
  gototop()
  katexinit()
}

function contentLoaded() {
  scrolltoshow()
}

detectOldBrowser()

onReady(contentReady)
document.addEventListener("pjax:content", contentReady)

onLoad(contentLoaded)
window.addEventListener("pjax:load", contentLoaded)

pjaxinit()

window.addEventListener("pjax:load", pjaxLoaded)
