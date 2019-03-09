import { renderToString as getKatexString } from "katex"

export const katexinit = () => {
    for ( const el of Array.from(document.querySelectorAll('[data-mfm^="math"]')) ) {
        const n = document.createElement("span")
        n.setAttribute("data-mfm", "math")
        const s = getKatexString(el.textContent, { throwOnError: false })
        n.insertAdjacentHTML("afterbegin", s)
        el.insertAdjacentElement("beforebegin", n)
        el.parentNode.removeChild(el)
    }
}
