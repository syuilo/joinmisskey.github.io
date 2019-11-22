// tslint:disable: object-literal-sort-keys
import window from "./window"

const msgs = {
  ja: "「{0}」の検索結果",
  en: "Search result of \"{0}\"",
  fr: "Search result of \"{0}\""
}

export const searchinit = () => {
  let locale = location.pathname.split("/")[1]
  if (window.locales.indexOf(locale) === -1) locale = "ja"
  const btn = document.getElementById("searchButton") as HTMLButtonElement
  const input = document.getElementById("searchInput") as HTMLInputElement

  const move = () => {
    location.href = `/${locale}/search?q=${encodeURIComponent(input.value)}&moved`
  }

  btn.onclick = () => move()
  input.onkeypress = e => e.charCode === 13 ? move() : void 0

  const q = (new URLSearchParams(location.search)).get("q")
  if (location.pathname.startsWith(`/${locale}/search`) && q) {
    const h1 = document.querySelector("#main h1")
    h1.textContent = msgs[locale].replace("{0}",
      decodeURIComponent(q)
    )
  }
}
