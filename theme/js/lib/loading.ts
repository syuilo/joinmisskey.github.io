import onLoad from "./onLoad"

export class Loading {
  public ini: HTMLElement
  public loaded = false
  public readied = false

  constructor(ini: HTMLElement = document.getElementById("ini")) {
    this.ini = ini
    onLoad(() => {
      this.loaded = true
      this.hide()
    })

    this.readied = true
    const his = this
    setTimeout(() => {
      his.hide()
    }, 3000)

    window.onunload = () => this.show()
  }

  public show = () => {
    if (!this.loaded) {
      this.ini.classList.remove("hide")
      this.ini.classList.add("show")
    }
  }

  public hide = () => {
    if (location.pathname === "/") return
    this.ini.classList.remove("show")
    this.ini.classList.add("hide")
  }
}
