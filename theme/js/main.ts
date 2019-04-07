import("bootstrap/js/dist/collapse")
import("bootstrap/js/dist/dropdown")

import { fainit } from "./fainit"
import { gototop } from "./gototop"
import { katexinit } from "./katexinit"
import onReady from "./onReady"
import { scrolltoshow } from "./scrolltoshow"

import { detectOldBrowser } from "./old-browsers"
import { pjaxinit } from "./pjax"
import { pjaxLoaded } from "./pjax-loaded"

function contentLoaded() {
  fainit()
  scrolltoshow()
  gototop()
  katexinit()
}

detectOldBrowser()

onReady(contentLoaded)
document.addEventListener("pjax:content", contentLoaded)

pjaxinit()

window.addEventListener("pjax:load", pjaxLoaded)
