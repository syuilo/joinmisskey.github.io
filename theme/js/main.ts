import { fainit } from "./lib/fainit"
import { gad } from "./lib/gad"
import { gototop } from "./lib/gototop"
import importCss from "./lib/import-css"
import { detectOldBrowser } from "./lib/old-browsers"
import onReady from "./lib/onReady"
import { pjaxinit } from "./lib/pjax"
import { pjaxLoaded } from "./lib/pjax-loaded"
import { scrolltoshow } from "./lib/scrolltoshow"
import { twemojiinit } from "./lib/twemojiinit"

import { Loading } from "./lib/loading"
import { LoadToShow } from "./lib/loadtoshow"

function contentReady() {
  fainit()
  gototop()
  scrolltoshow()
  importCss()
  gad()
  twemojiinit()
}

pjaxinit()

detectOldBrowser()

onReady(() => {
  new Loading()
  new LoadToShow()
})

onReady(contentReady)
document.addEventListener("pjax:content", contentReady)

window.addEventListener("pjax:load", pjaxLoaded)
