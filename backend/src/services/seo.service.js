/**
 * Rule-based SEO analyzer
 * Score maksimal: 100
 */
export function analyzeSEO({
  title = '',
  content = '',
  meta_description = '',
  keyword = ''
}) {
  let score = 0

  const textContent = stripHtml(content)
  const words = textContent.split(/\s+/).filter(Boolean)
  const wordCount = words.length

  // 1️⃣ Title length (50–60)
  if (title.length >= 50 && title.length <= 60) {
    score += 20
  }

  // 2️⃣ Meta description (>=120 chars)
  if (meta_description && meta_description.length >= 120) {
    score += 20
  }

  // 3️⃣ Content length (>300 words)
  if (wordCount >= 300) {
    score += 20
  }

  // 4️⃣ Keyword in title
  if (keyword && title.toLowerCase().includes(keyword.toLowerCase())) {
    score += 20
  }

  // 5️⃣ Keyword in content
  if (keyword && textContent.toLowerCase().includes(keyword.toLowerCase())) {
    score += 20
  }

  return score
}

/**
 * Helper: strip HTML tags
 */
function stripHtml(html) {
  return html.replace(/<[^>]*>?/gm, ' ')
}
