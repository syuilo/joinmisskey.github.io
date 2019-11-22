import onReady from "./onReady"
import window from "./window"

export const twemojiinit = async () => {
  const script = document.createElement("script")
  script.src = "https://twemoji.maxcdn.com/v/latest/twemoji.min.js"
  script.onload = () => {
    window.twemoji.parse(document.body, {
      ext: ".svg",
      folder: "svg"
    })
  }
  onReady(() => document.head.appendChild(script))
}
