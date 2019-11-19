import * as allSettled from "promise.allsettled"
import onReady from "./onReady"
import { csses } from "./vals"
import window from "./window"

export class ImportCss {
  public basics = [] as HTMLLinkElement[]
  public lazies = {} as {
      [x: string]: HTMLLinkElement
    }

  constructor() {
    // basic style loading
    const his = this
    csses.map(url => this.appendLinkTag(url))

    // lazy style loading
    onReady(this.renew)
    document.addEventListener("pjax:ready", this.renew)
  }

  public appendLinkTag = (url: string, s?: string) => {
    const style = document.createElement("link")
    const his = this
    style.rel = "stylesheet"
    style.href = url
    style.disabled = false
    window.requestAnimationFrame(() => {
      if (s) his[s] = document.head.appendChild(style)
      else his.basics.push(document.head.appendChild(style))
    })
  }

  public renew = () => {
    window.styleRequires.map(this.append)
    for (const [s] of Object.entries(this.lazies)) {
      if (!window.styleRequires.includes(s)) this.unuse(s)
    }

    if (window.currentLocale !== "false") {
      this.append(`fonts-${window.currentLocale}`)
    }
    window.locales.map(l => l === window.currentLocale ? void 0 : this.unuse(`fonts-${l}`))
  }

  public append = (s: string) => {
    if (s in this.lazies && this.lazies[s].disabled) {
      this.lazies[s].disabled = false
    } else {
      this.appendLinkTag(`/assets/styles/${s}.css`, s)
    }
  }

  public unuse = (s: string) => {
    if (s in this.lazies && !this.lazies[s].disabled) {
      this.lazies[s].disabled = true
    }
  }
}
