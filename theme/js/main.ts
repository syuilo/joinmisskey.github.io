
import { fainit } from "./fainit"
import { gototop } from "./gototop"
import { katexinit } from "./katexinit"
import onReady from "./onReady"
import { scrolltoshow } from "./scrolltoshow"

import { detectOldBrowser } from "./old-browsers"
import { pjaxinit } from "./pjax"
import { pjaxLoaded } from "./pjax-ready-others"

function contentLoaded() {
  fainit()
  scrolltoshow()
  gototop()
  katexinit()
}

onReady(contentLoaded)
document.addEventListener("pjax:content", contentLoaded)

pjaxinit()

detectOldBrowser()

window.addEventListener("pjax:load", pjaxLoaded)
