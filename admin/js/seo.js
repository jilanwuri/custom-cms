export function seoAnalyze({ title, content, keyword, meta }) {
  let score = 0

  const text = content.replace(/<[^>]*>/g, ' ')
  const words = text.split(/\s+/).filter(Boolean)

  if (title.length >= 50 && title.length <= 60) score += 20
  if (meta.length >= 120) score += 20
  if (words.length >= 300) score += 20
  if (keyword && title.toLowerCase().includes(keyword.toLowerCase())) score += 20
  if (keyword && text.toLowerCase().includes(keyword.toLowerCase())) score += 20

  return score
}
