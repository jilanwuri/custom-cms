const form = document.getElementById('loginForm')

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    // dummy auth
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('cms_auth', 'true')
      window.location.href = 'dashboard.html'
    } else {
      alert('Login gagal')
    }
  })
}

// guard function (dipakai halaman lain)
export function requireAuth() {
  const isAuth = localStorage.getItem('cms_auth')
  if (!isAuth) {
    window.location.href = 'index.html'
  }
}

export function logout() {
  localStorage.removeItem('cms_auth')
  window.location.href = 'index.html'
}
