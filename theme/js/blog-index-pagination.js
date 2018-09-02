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
            const num = Number(pagination.textContent) - 1
            toggleArticles(num, articles, paginations)
        }
    }
    const search = RegExp(/pages=([0-9]+)/i).exec(window.location.search)
    if (search) toggleArticles(search[1] - 1, articles, paginations)
}
function b(i, num){ return num * 15 <= i && i < (num + 1) * 15 }
function toggleArticles(num, articles, paginations) {
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
    pagination.classList.add('active')
    history.pushState()
}

window.addEventListener('DOMContentLoaded', addListenerBlogIndexpagination)
window.addEventListener('pjax:load', addListenerBlogIndexpagination)
