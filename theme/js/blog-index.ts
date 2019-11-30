import onReady from "./lib/onReady"

const num = 18

onReady(() => {
  const search = new URLSearchParams(location.search)
  const page = search.get("page") ? Number(search.get("page")) - 1 : 0
  const min = num * page
  const max = num * (page + 1)
  const articles = document.getElementsByClassName("blog-index-item") as HTMLCollectionOf<HTMLAnchorElement>
  const indexContainer = document.getElementById("blog_index")
  const paginationContainer = document.getElementById("pagination_container")
  const paginationItems = paginationContainer.querySelectorAll(".page-item") as NodeListOf<HTMLLIElement>
  if (articles.length === 0 && !indexContainer && !paginationContainer) return
  const pagesNum = Math.floor(articles.length / num)

  if (page <= pagesNum) {
    const canonical = document.querySelector("link[rel=\"canonical\"]") as HTMLLinkElement
    canonical.href = `${canonical.href}?page=${page + 1}`

    for (const alternate of document.querySelectorAll("link[rel=\"alternate\"]") as unknown as HTMLLinkElement[]) {
      alternate.href = `${alternate.href}?page=${page + 1}`
    }
  }

  // tslint:disable-next-line: forin
  for (const N in articles) {
    const n = Number(N)
    if (n === 0 || n) {
      const article = articles[N]
      if (n >= min && n < max) article.style.display = "block"
      else article.style.display = "none"
    }
  }

  const htm = `<li class="page-item disabled"><a class="page-link" href="#" tabindex="-1">…</a></li>`
  // tslint:disable-next-line: forin
  for (const I in paginationItems) {
    const i = Number(I)
    if (i === 0 || i) {
      const item = paginationItems[I]

      if (i === page) item.classList.add("active")
      else if ( pagesNum > 6 && i !== 0 && i !== page - 1 && i !== page + 1 && i !== pagesNum) item.style.display = "none"

      if (pagesNum <= 6) continue
      if (i === page - 1 && i !== 1) item.insertAdjacentHTML("beforebegin", htm)
      if (i === page + 1 && i !== pagesNum - 1) item.insertAdjacentHTML("afterend", htm)
    }
  }

  const h1 = document.querySelector("#main h1")
  h1.insertAdjacentHTML("beforeend", `<small class="font-weight-light">&nbsp;(${page + 1}/${pagesNum + 1})</small>`)
})
