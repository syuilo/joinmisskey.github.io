import window from "./window"

export const removeMoved = () => {
  if (location.search && location.search.indexOf("moved") > -1) {
    const search = new URLSearchParams(location.search)
    search.delete("moved")
    const str = search.toString()
    history.replaceState(null, null, `${str ? `?${str}` : `./`}${location.hash}`)
    window.gtag("set", "referrer", `${location.origin}/`)
  }
}
