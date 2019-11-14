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
import { searchinit } from "./lib/searchinit"

function contentReady() {
  fainit()
  gototop()
  scrolltoshow()
  importCss()
  gad()
  twemojiinit()
}

detectOldBrowser()

onReady(() => {
  contentReady()
  new Loading()
  new LoadToShow()
})

document.addEventListener("pjax:content", contentReady)

window.addEventListener("pjax:load", pjaxLoaded)

pjaxinit().then(pjax => {
  searchinit(pjax)
})
