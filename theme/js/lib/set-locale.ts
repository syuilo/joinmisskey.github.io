import window from "./window"

export const setLocale = () => {
  const nihongos = document.getElementsByClassName("nihongo") as unknown as HTMLAnchorElement[]
  for (const nihongo of nihongos) {
    nihongo.onclick = () => {
      const lang = nihongo.dataset.lang
      localStorage.setItem("locale", lang)
      location.href = `/${lang}${window.permalink}${location.search}${location.hash}`
    }
  }
}
