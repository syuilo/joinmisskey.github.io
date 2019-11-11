import onLoad from "./onLoad"

export class Loading {
  public ini: HTMLElement
  public loaded = false
  public readied = false

  constructor(ini: HTMLElement = document.getElementById("ini")) {
    this.ini = ini
    const his = this

    window.addEventListener("pjax:fetch", () => {
      his.loaded = false
      his.show()
    })

    window.addEventListener("pjax:load", () => {
      his.loaded = true
      his.readied = false
      his.hide()
    })

    onLoad(() => {
      his.loaded = true
      if (location.pathname !== "/") his.hide()
    })
    setTimeout(() => {
      if (location.pathname !== "/") his.hide()
    }, 8000)

    document.addEventListener("pjax:ready", () => {
      his.readied = true
      setTimeout(() => {
        his.hide()
      }, 3000)
    })
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
    this.ini.classList.remove("show")
    this.ini.classList.add("hide")
  }
}
