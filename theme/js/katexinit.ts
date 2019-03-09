import { render } from "katex"

export const katexinit = () => {
    for ( const el of Array.from(document.querySelectorAll('[data-mfm^="math"]')) as HTMLElement[] ) {
        const f = el.textContent
        el.textContent = ""
        render(f, el, {
            throwOnError: false
        })
    }
}
