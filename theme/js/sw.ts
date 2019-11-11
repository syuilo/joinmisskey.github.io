import { swinit } from "./lib/swinit"

swinit()
document.addEventListener("pjax:content", swinit)
