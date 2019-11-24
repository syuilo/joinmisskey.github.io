import window from "./window"

const userLanguage = localStorage.getItem("locale") || navigator.language

export const localeMove = () => {
  function move_locale(targetlang: string) {
    if (targetlang !== window.currentLocale) {
      location.href = `/${targetlang}${window.permalink}${location.search}${location.hash}`
    }
  }

  function iAmNotRobot(): boolean {
    const ua = window.navigator.userAgent.toLowerCase()
    for (const text of [
      "googlebot",
      "google.com/bot",
      "google.com/feedfetcher",
      "bingbot",
      "bing.com/bingbot",
      "bingpreview",
      "msnbot",
      "search.msn.com/msnbot",
      "ahrefsbot",
      "ahrefs.com/robot",
      "baiduspider",
      "baidu.com/search/spider",
      "yandexbot",
      "yandex.com/bots",
      "slurp",
      "help.yahoo.com/help/us/ysearch/slurp"
    ]) if (ua.indexOf(text) !== -1) return false
    return true
  }

  if (
    (window.currentLocale !== "false" || location.pathname === window.pathname)
    && iAmNotRobot()
  ) {
    if (window.locales.indexOf(userLanguage) >= 0) {
      move_locale(userLanguage)
    } else if (window.locales.indexOf(userLanguage.slice(0, 2)) >= 0) {
      move_locale(userLanguage.slice(0, 2))
    } else if (window.currentLocale !== "en") {
      move_locale("en")
    }
  }
}
