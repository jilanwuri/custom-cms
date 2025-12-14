import { requireAuth } from './auth.js'
import { api } from './api.js'
import { seoAnalyze } from './seo.js'

requireAuth()

const titleInput = document.getElementById('title')
const keywordInput = document.getElementById('keyword')
const metaInput = document.getElementById('meta')
const seoScoreEl = document.getElementById('seoScore')

const editor = new tiptap.Editor({
  element: document.getElementById('editor'),
  extensions: [tiptap.StarterKit],
  content: '<p>Mulai menulis artikel...</p>',
  onUpdate() {
    updateSEO()
  }
})

function updateSEO() {
  const score = seoAnalyze({
    title: titleInput.value,
    content: editor.getHTML(),
    keyword: keywordInput.value,
    meta: metaInput.value
  })

  seoScoreEl.textContent = score
}

titleInput.addEventListener('input', updateSEO)
keywordInput.addEventListener('input', updateSEO)
metaInput.addEventListener('input', updateSEO)

document.getElementById('save').onclick = async () => {
  if (!titleInput.value || !editor.getText()) {
    alert('Judul dan konten wajib diisi')
    return
  }

  await api.createArticle({
    title: titleInput.value,
    content: editor.getHTML(),
    excerpt: editor.getText().slice(0, 150),
    meta_description: metaInput.value,
    keyword: keywordInput.value
  })

  window.location.href = 'dashboard.html'
}
