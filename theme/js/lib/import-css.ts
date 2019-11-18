import onReady from "./onReady"
import window from "./window"

export class ImportCss {
  public imports = {} as {
      [x: string]: {
        using: boolean
        module: any
      }
    }

  constructor() {
    onReady(this.renew)
    document.addEventListener("pjax:ready", this.renew)
  }

  public renew = () => {
    window.styleRequires.map(this.append)
    for (const [s, t] of Object.entries(this.imports)) {
      if (!window.styleRequires.includes(s)) t.module.unuse()
    }
  }

  public append = (s: string) => {
    if (s in this.imports && !this.imports[s].using) {
      this.imports[s].using = true
      this.imports[s].module.use()
    } else {
      const his = this
      import(`*lazy-style/${s}.sass`).then(t => {
        his.imports[s] = { using: true, module: t }
        t.use()
      })
    }
  }

  public unuse = (s: string) => {
    if (s in this.imports && this.imports[s].using) {
      this.imports[s].using = false
      this.imports[s].module.unuse()
    }
  }
}
