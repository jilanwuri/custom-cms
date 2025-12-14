import { db } from '../db.js'

/**
 * GET ACTIVE THEME
 */
export function getTheme(req, res) {
  const row = db
    .prepare(`SELECT value FROM settings WHERE key = 'theme'`)
    .get()

  res.json({
    theme: row?.value || 'techno'
  })
}

/**
 * SET ACTIVE THEME
 */
export function setTheme(req, res) {
  const { theme } = req.body

  if (!theme) {
    return res.status(400).json({ error: 'Theme is required' })
  }

  db.prepare(`
    INSERT INTO settings (key, value)
    VALUES ('theme', ?)
    ON CONFLICT(key)
    DO UPDATE SET value = excluded.value
  `).run(theme)

  res.json({ success: true })
}
