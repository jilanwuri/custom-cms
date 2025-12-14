import { requireAuth } from './auth.js'
import { api } from './api.js'

requireAuth()

const select = document.getElementById('theme')
const saveBtn = document.getElementById('save')

// load theme aktif
api.getTheme().then(res => {
  select.value = res.theme
})

// simpan theme
saveBtn.onclick = async () => {
  await api.setTheme(select.value)
  alert('Theme berhasil disimpan')
}
