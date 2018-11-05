function scrollts(){
    const els = document.getElementsByClassName('scrollts')
    if(IntersectionObserver !== undefined){
        const observer = new IntersectionObserver((entries, observer) => {
            for (let entry of entries) {
                if(entry.isIntersecting){
                    entry.target.classList.add('show')
                    observer.unobserve(entry.target)
                }
            }
        }, {
            threshold: 0,
            rootMargin: '-30% 0px'
        })
        const observer_nomargin = new IntersectionObserver((entries, observer) => {
            for (let entry of entries) {
                if(entry.isIntersecting){
                    entry.target.classList.add('show')
                    observer.unobserve(entry.target)
                }
            }
        }, {
            threshold: 0,
            rootMargin: '0px'
        })
        Array.prototype.forEach.call(els, el => {
            if(el.classList.contain('scrollts-nomargin')) observer_nomargin.observe(el)
            else observer.observe(el)
        })
    } else {
        console.log('v')
        Array.prototype.forEach.call(els, el => {
            el.classList.add('show')
        })
    }
}
window.addEventListener('load', scrollts)
window.addEventListener('pjax:load', scrollts)