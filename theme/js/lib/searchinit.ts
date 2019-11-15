// tslint:disable: object-literal-sort-keys
import Pjax from "pjax-api"
import * as qs from "qs"
import onReady from "./onReady"
import { cses } from "./vals"
import window from "./window"

const msgs = {
  ja: "「{0}」の検索結果",
  en: "Search result of \"{0}\"",
  fr: "Search result of \"{0}\""
}

const s = (pjax: Pjax) => {
  let locale = location.pathname.split("/")[1]
  if (window.locales.indexOf(locale) === -1) locale = "ja"
  const q = (qs.parse(window.location.search, { ignoreQueryPrefix: true })).q
  const btn = document.getElementById("searchButton") as HTMLButtonElement
  const input = document.getElementById("searchInput") as HTMLInputElement
  const scriptId = "searchScript"
  let script = document.getElementById(scriptId) as HTMLScriptElement
  if (!script || !script.src.endsWith(cses[locale])) {
    if (script) script.remove()
    const newel = document.createElement("script")
    newel.src = `https://cse.google.com/cse.js?cx=${cses[locale]}`
    newel.id = scriptId
    newel.async = true
    script = document.head.appendChild(newel)
  }
  /*
  const showResult = () => {
    const h1 = document.querySelector("#main h1")
    h1.textContent = msgs[locale].replace("{0}",
      decodeURIComponent(q)
    )
    window.google.search.cse.element.render({
      div: "searchResult",
      tag: "searchresults-only",
      gname: (new Date()).getTime().toString(36),
      attributes: {
        autoSearchOnLoad: false
      }
    })
  }*/

  const move = () => {
    // if (input.value) pjax.replace(`/${locale}/search/?q=${encodeURIComponent(input.value)}`)
    location.href = `/${locale}/search/?q=${encodeURIComponent(input.value)}`
  }

  btn.onclick = () => move()
  input.onkeypress = e => e.charCode === 13 ? move() : void(0)

  if (location.pathname.startsWith(`/${locale}/search/`) && q) {
    const h1 = document.querySelector("#main h1")
    h1.textContent = msgs[locale].replace("{0}",
      decodeURIComponent(q)
    )
    /*
    if (
      "google" in window &&
      "search" in window.google &&
      "cse" in window.google.search &&
      "element" in window.google.search.cse &&
      "render" in window.google.search.cse.element
    ) {
      showResult()
    } else {
      script.onload = () => setTimeout(() => showResult(), 300)
    }*/
  }

}

export const searchinit = (pjax: Pjax) => {
  onReady(() => s(pjax))
  document.addEventListener("pjax:ready", () => s(pjax))
}
