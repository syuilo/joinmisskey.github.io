
declare global {
  // tslint:disable-next-line: interface-name
  interface Window {
    currentLocale: string
    permalink: string
    locales: string[]
    pathname: string
  }
}

import { Pjax } from "pjax-api"

const userLanguage = navigator.language

function move_locale(targetlang: string) {
  if (targetlang !== window.currentLocale) {
    window.addEventListener("DOMContentLoaded", () => {
      Pjax.replace("/" + targetlang + window.permalink + "?moved" + window.location.hash, {})
    })
  }
}

export const pjaxinit = (): Pjax => {
  if (window.currentLocale !== "false" || window.location.pathname === window.pathname) {
    if (window.location.search.indexOf("moved") === -1) {
      if (window.locales.indexOf(userLanguage) >= 0) {
        move_locale(userLanguage)
      } else if (window.locales.indexOf(userLanguage.slice(0, 2)) >= 0) {
        move_locale(userLanguage.slice(0, 2))
      } else if (window.currentLocale !== "ja") {
        window.addEventListener("DOMContentLoaded", () => {
          Pjax.replace("/ja" + window.permalink + "?moved" + window.location.hash, {})
        })
      }
    } else {
      history.replaceState(null, null, window.location.href.replace(/\?[^#]*/, ""))
    }
  }
  return new Pjax({ areas: ["#main, #breadcrumb, #mainnav, #updateTime", "body"], update: { head: "meta" } })
}
