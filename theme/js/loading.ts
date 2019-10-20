import onLoad from "./onLoad"

export class Loading {
  public ini: HTMLElement
  public loaded = false

  constructor(ini: HTMLElement = document.getElementById("ini")) {
    this.ini = ini
    const his = this

    window.addEventListener("pjax:fetch", () => {
      his.loaded = false
      his.show()
    })

    window.addEventListener("pjax:load", () => {
      his.loaded = true
      his.hide()
    })

    onLoad(() => {
      his.loaded = true
      his.ini.classList.add("hide")
    })
  }

  public show = () => {
    const his = this
    setTimeout(() => {
      if (!his.loaded) {
        his.ini.classList.remove("hide")
        his.ini.classList.add("show")
      }
    }, 300)
  }

  public hide = () => {
    this.ini.classList.remove("show")
    this.ini.classList.add("hide")
  }
}
