const { getNode } = require('../../scripts/falib')

function fainit(){
    const els = Array.from(document.getElementsByTagName('i'))
    for( let el of els ){
        if(!el.hasChildNodes()){
            const fa = getNode(
                { prefix: el.dataset.faPrefix, iconName: el.dataset.faIconName },
                JSON.parse(el.dataset.faOption.replace(/'/g,"\""))
                )
            el.insertAdjacentElement('beforebegin', fa.item(0))
            el.parentElement.removeChild(el)
        }
    }
}

window.addEventListener('DOMContentLoaded', fainit)
document.addEventListener('pjax:content', fainit)