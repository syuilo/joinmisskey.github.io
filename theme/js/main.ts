import { fainit } from "./lib/fainit"
import { gad } from "./lib/gad"
import { gainit } from "./lib/gainit"
import { gototop } from "./lib/gototop"
import { importCss } from "./lib/import-css"
import { localeMove } from "./lib/locale-move"
import { detectOldBrowser } from "./lib/old-browsers"
import onReady from "./lib/onReady"
import { scrolltoshow } from "./lib/scrolltoshow"
import { twemojiinit } from "./lib/twemojiinit"

import { LoadToShow } from "./lib/loadtoshow"
import { searchinit } from "./lib/searchinit"
import { setLocale } from "./lib/set-locale"

detectOldBrowser()
gainit()
localeMove()
twemojiinit()

onReady(() => {
  importCss()
  fainit()
  scrolltoshow()
  searchinit()
  gototop()
  setLocale()
  new LoadToShow()
  gad()
})
