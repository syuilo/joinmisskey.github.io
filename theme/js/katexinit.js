import katex from 'katex'

function katexinit(){
    for( let el of Array.from(document.querySelectorAll('[data-mfm="math"]')) ){
        const n = document.createElement('span')
        katex.render(el.textContent, n,{ throwOnError: false })
        el.parentNode.insertBefore(n, el)
        el.parentNode.removeChild(el)
    }
}

window.addEventListener('DOMContentLoaded', katexinit)
document.addEventListener('pjax:content', katexinit)