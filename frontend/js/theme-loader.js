const API_URL = 'http://localhost:3000/api/settings/theme'

export async function loadTheme() {
  try {
    const res = await fetch(API_URL)
    const data = await res.json()

    const theme = data.theme || 'techno'

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `/themes/${theme}/theme.css`

    document.head.appendChild(link)
  } catch (err) {
    console.error('Failed to load theme, fallback to default')
  }
}
