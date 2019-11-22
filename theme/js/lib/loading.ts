import onLoad from "./onLoad"
import onReady from "./onReady"

export class Loading {
  public ini: HTMLElement
  public loaded = false
  public readied = false

  constructor(ini: HTMLElement = document.getElementById("ini")) {
    this.ini = ini
    const his = this

    window.addEventListener("pjax:fetch", () => {
      his.loaded = false
      his.readied = false
      his.show()
    })

    window.addEventListener("pjax:load", this.onload)
    onLoad(this.onload)

    onReady(this.onready)
    document.addEventListener("pjax:ready", this.onready)
  }

  public onready = () => {
    this.readied = true
    const his = this
    setTimeout(() => {
      his.hide()
    }, 3000)
  }

  public onload = () => {
    this.loaded = true
    this.hide()
  }

  public show = () => {
    const his = this
    setTimeout(() => {
      if (!his.loaded) {
        his.ini.classList.remove("hide")
        his.ini.classList.add("show")
      }
    }, 100)
    setTimeout(() => {
      if (his.readied) his.hide()
    }, 3000)
  }

  public hide = () => {
    if (location.pathname !== "/") return
    this.ini.classList.remove("show")
    this.ini.classList.add("hide")
  }
}
