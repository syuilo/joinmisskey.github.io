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
            console.log('はっか')
            for (let pa of paginations) {
                if (pa.classList.contains('active')) pa.classList.remove('active')
            }
            pagination.classList.add('active')
            const num = Number(pagination.textContent) - 1
            for (i = 0; i < articles.length; i++){
                if(!b(i, num)) {
                    articles[i].classList.remove('d-block')
                    articles[i].classList.add('d-none')
                }
            }
            for (i = 0; i < articles.length; i++){
                if(b(i, num)) {
                    articles[i].classList.remove('d-none')
                    articles[i].classList.add('d-block')
                }
            }
            window.scroll({
                top: 0,
                behavior: "smooth"
            })
        }
    }
}
function b(i, num){ return num * 15 < i && i <= (num + 1) * 15 }


window.addEventListener('DOMContentLoaded', addListenerBlogIndexpagination)
window.addEventListener('pjax:load', addListenerBlogIndexpagination)