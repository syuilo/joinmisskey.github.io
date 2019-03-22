import onReady from "./onReady";

declare global {
  // tslint:disable-next-line: interface-name
  interface Window {
    currentLocale: string
    permalink: string
    locales: string[]
    pathname: string
  }
}

const userLanguage = navigator.language

export const pjaxinit = async () => {
  const { Pjax } = await import("pjax-api")
  function move_locale(targetlang: string) {
    if (targetlang !== window.currentLocale) {
      window.addEventListener("DOMContentLoaded", () => {
        Pjax.replace(`/${targetlang}${window.permalink}?moved${window.location.hash}`, {})
        // window.location.href = `/${targetlang}${window.permalink}?moved${window.location.hash}`
      })
    }
  }

  if (window.currentLocale !== "false" || window.location.pathname === window.pathname) {
    if (window.location.search.indexOf("moved") === -1) {
      if (window.locales.indexOf(userLanguage) >= 0) {
        move_locale(userLanguage)
      } else if (window.locales.indexOf(userLanguage.slice(0, 2)) >= 0) {
        move_locale(userLanguage.slice(0, 2))
      } else if (window.currentLocale !== "ja") {
        onReady(() => {
          Pjax.replace(`/ja${window.permalink}?moved${window.location.hash}`, {})
        })
      }
    } else {
      history.replaceState(null, null, window.location.href.replace(/\?[^#]*/, ""))
    }
  }

  return new Pjax({ areas: ["#main, #breadcrumb, #mainnav, #updateTime", "body"], update: { head: "meta" } })
}
