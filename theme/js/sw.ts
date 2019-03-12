import { swinit } from "./swinit"

swinit()
document.addEventListener("pjax:content", swinit)
