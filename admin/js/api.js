const BASE_URL = 'http://localhost:3000/api'

export const api = {
  getArticles() {
    return fetch(`${BASE_URL}/articles`)
      .then(res => res.json())
  },

  createArticle(data) {
    return fetch(`${BASE_URL}/articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json())
  },

  getTheme() {
    return fetch(`${BASE_URL}/settings/theme`)
      .then(res => res.json())
  },

  setTheme(theme) {
    return fetch(`${BASE_URL}/settings/theme`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme })
    }).then(res => res.json())
  }
}
