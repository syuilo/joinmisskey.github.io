
declare global {
  // tslint:disable-next-line: interface-name
  interface Window {
    current_locale: string
    permalink: string
    locales: string[]
    pathname: string
    user_language: string
  }
}

import { Pjax } from "pjax-api"

function move_locale(targetlang: string) {
  if (targetlang !== window.current_locale) {
    window.addEventListener("DOMContentLoaded", () => {
      Pjax.replace("/" + targetlang + window.permalink + "?moved" + window.location.hash, {})
    })
  }
}

export const pjaxinit = (): Pjax => {
  if (window.current_locale !== "false" || window.location.pathname === window.pathname) {
    if (window.location.search.indexOf("moved") === -1) {
      if (window.locales.indexOf(window.user_language) >= 0) {
        move_locale(window.user_language)
      } else if (window.locales.indexOf(window.user_language.slice(0, 2)) >= 0) {
        move_locale(window.user_language.slice(0, 2))
      } else if (window.current_locale !== "ja") {
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
