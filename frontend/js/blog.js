const API = 'http://localhost:3000/api/articles'
const container = document.getElementById('blog')

// ambil slug dari query string
const params = new URLSearchParams(window.location.search)
const slug = params.get('slug')

if (slug) {
  loadDetail(slug)
} else {
  loadList()
}

/**
 * BLOG LIST
 */
async function loadList() {
  const res = await fetch(API)
  const articles = await res.json()

  if (!articles.length) {
    container.innerHTML = '<p>Belum ada artikel.</p>'
    return
  }

  container.innerHTML = articles.map(a => `
    <article class="blog-card">
      <h2>
        <a href="/pages/blog.html?slug=${a.slug}">
          ${a.title}
        </a>
      </h2>
      <p>${a.excerpt || ''}</p>
      <small>SEO Score: ${a.seo_score}</small>
    </article>
  `).join('')
}

/**
 * BLOG DETAIL
 */
async function loadDetail(slug) {
  const res = await fetch(`${API}/${slug}`)

  if (res.status !== 200) {
    container.innerHTML = '<p>Artikel tidak ditemukan.</p>'
    return
  }

  const a = await res.json()

  document.title = a.meta_title || a.title

  container.innerHTML = `
    <article>
      <h1>${a.title}</h1>
      <div>${a.content}</div>
    </article>
  `
}
