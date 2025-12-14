import { db } from '../db.js'
import slugify from 'slugify'
import { analyzeSEO } from '../services/seo.service.js'

/**
 * CREATE ARTICLE
 */
export function createArticle(req, res) {
  const {
    title,
    content,
    excerpt = '',
    meta_title = '',
    meta_description = '',
    keyword = ''
  } = req.body

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' })
  }

  let slug = slugify(title, { lower: true, strict: true })

  // pastikan slug unik
  const exists = db
    .prepare('SELECT id FROM articles WHERE slug = ?')
    .get(slug)

  if (exists) {
    slug = `${slug}-${Date.now()}`
  }

  const seo_score = analyzeSEO({
    title,
    content,
    meta_description,
    keyword
  })

  const stmt = db.prepare(`
    INSERT INTO articles
    (
      title,
      slug,
      content,
      excerpt,
      meta_title,
      meta_description,
      keyword,
      seo_score
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const result = stmt.run(
    title,
    slug,
    content,
    excerpt,
    meta_title || title,
    meta_description,
    keyword,
    seo_score
  )

  res.json({
    success: true,
    id: result.lastInsertRowid,
    slug,
    seo_score
  })
}

/**
 * LIST ARTICLES (for admin / blog list)
 */
export function getArticles(req, res) {
  const rows = db.prepare(`
    SELECT
      id,
      title,
      slug,
      excerpt,
      seo_score,
      status,
      created_at
    FROM articles
    ORDER BY created_at DESC
  `).all()

  res.json(rows)
}

/**
 * GET ARTICLE BY SLUG (for frontend)
 */
export function getArticleBySlug(req, res) {
  const { slug } = req.params

  const row = db.prepare(`
    SELECT *
    FROM articles
    WHERE slug = ? AND status = 'published'
  `).get(slug)

  if (!row) {
    return res.status(404).json({ error: 'Article not found' })
  }

  res.json(row)
}
