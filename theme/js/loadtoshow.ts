import { tsShow } from "./toshow"

import onLoad from "./onLoad"

export class LoadToShow {
  public ini: HTMLElement
  public loaded = false

  constructor(ini: HTMLElement = document.getElementById("ini")) {
    this.ini = ini
    const his = this

    window.addEventListener("pjax:fetch", () => {
      his.loaded = false
      setTimeout(() => {
        if (!his.loaded) his.show()
      }, 10000)
    })

    window.addEventListener("pjax:load", () => {
      his.loaded = true
      his.show()
    })
    onLoad(() => {
      his.loaded = true
      his.show()
    })

    setTimeout(() => {
      if (!his.loaded) his.show()
    }, 10000)
  }

  public show = (): void => {
    const els = Array.from(document.getElementsByClassName("loadts"))
    for (const el of els) {
      tsShow(el)
    }
  }
}
