import window from "./window"

export const gainit = () => {
  window.dataLayer = window.dataLayer || []
  // tslint:disable-next-line: only-arrow-functions
  window.gtag = function() { window.dataLayer.push(arguments) }
  window.gtag("js", new Date())
  window.gtag("config", window.gaId, void 0)
}
