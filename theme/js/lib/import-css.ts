import * as allSettled from "promise.allsettled"
import onReady from "./onReady"
import window from "./window"

export class ImportCss {
  public basics = [] as HTMLLinkElement[]
  public lazies = {} as {
      [x: string]: HTMLLinkElement
    }

  constructor() {
    // basic style loading
    this.basics = Array.from(document.querySelectorAll("link.base-style[rel=\"preload\"]"))

    for (const basic of this.basics) {
      basic.rel = "stylesheet"
      basic.as = ""
    }

    // lazy style loading
    const lazies = Array.from(document.querySelectorAll("link.lazy-style[rel=\"preload\"]")) as HTMLLinkElement[]

    for (const lazy of lazies) {
      this.lazies[lazy.dataset.name] = lazy
    }

    this.renew()
    document.addEventListener("pjax:ready", this.renew)
  }

  public renew = () => {
    window.styleRequires.map(this.use)
    for (const [s] of Object.entries(this.lazies)) {
      if (!window.styleRequires.includes(s)) this.unuse(s)
    }

    if (window.currentLocale !== "false") {
      this.use(`fonts-${window.currentLocale}`)
    }
    window.locales.map(l => l === window.currentLocale ? void 0 : this.unuse(`fonts-${l}`))
  }

  public use = (s: string) => {
    if (s in this.lazies && this.lazies[s].disabled) {
      if (this.lazies[s].rel === "preload") this.lazies[s].rel = "stylesheet"
      this.lazies[s].disabled = false
    }
  }

  public unuse = (s: string) => {
    if (s in this.lazies && !this.lazies[s].disabled) {
      this.lazies[s].disabled = true
    }
  }
}
