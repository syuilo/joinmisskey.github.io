function b(i, num){ return (num - 1) * 15 <= i && i < num * 15 }
function toggleArticles(num, articles, paginations, push) {
    for (i = 0; i < articles.length; i++){
        if(!b(i, num)) {
            articles[i].classList.remove('d-block')
            articles[i].classList.add('d-none')
        }
        if(b(i, num)) {
            articles[i].classList.remove('d-none')
            articles[i].classList.add('d-block')
        }
    }
    window.scroll({
        top: 0,
        behavior: "smooth"
    })
    for (let pa of paginations) {
        if (pa.classList.contains('active')) pa.classList.remove('active')
    }
    paginations[num - 1].classList.add('active')
    if (push) history.pushState({state: 'jmk', page: num}, null, `?page=${num}`)
}
function addListenerBlogIndexpagination(){
    const paginationsParent = document.getElementById('blog_index_pagination')
    const articlesParent = document.getElementById('blog_index_find')
    if ( !paginationsParent || !articlesParent ) return void(0)
    const paginations = paginationsParent.children
    const articles = articlesParent.children
    if ( articles.length < 2 ) return void(0)
    for (let pagination of paginations) {
        pagination.onclick = togglePage
        function togglePage(){
            const num = Number(pagination.textContent)
            toggleArticles(num, articles, paginations, true)
        }
    }
    const search = RegExp(/page=([0-9]+)/i).exec(window.location.search)
    if (search) toggleArticles(search[1], articles, paginations, false)
    window.onpopstate = e => {
        if (e.state.state == 'jmk') toggleArticles(e.state.page, articles, paginations, false)
    }
}
window.addEventListener('DOMContentLoaded', addListenerBlogIndexpagination)
window.addEventListener('pjax:load', addListenerBlogIndexpagination)
