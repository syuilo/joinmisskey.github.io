const { getNode } = require('../../scripts/falib')

function fainit(){
    for( let el of Array.from(document.getElementsByTagName('i')) ){
        if(!el.hasChildNodes()){
            try {
                const fa = getNode(
                    { prefix: el.dataset.faPrefix, iconName: el.dataset.faIconName },
                    (el.dataset.faOption ? JSON.parse(el.dataset.faOption.replace(/'/g,"\"")) : {})
                    )
                el.insertAdjacentElement('beforebegin', fa.item(0))
                el.parentElement.removeChild(el)
            } catch(e) {
                console.log(`FontAwesome: ${el.dataset.faPrefix} ${el.dataset.faIconName}は見つかりませんでした。`)
                console.log(e)
            }
        }
    }
}

window.addEventListener('DOMContentLoaded', fainit)
document.addEventListener('pjax:content', fainit)