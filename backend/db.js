import Database from 'better-sqlite3'
import fs from 'fs'

const DB_FILE = 'database.sqlite'

// buat file DB kalau belum ada
if (!fs.existsSync(DB_FILE)) {
  fs.closeSync(fs.openSync(DB_FILE, 'w'))
}

export const db = new Database(DB_FILE)

// schema FINAL
db.exec(`
CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  meta_title TEXT,
  meta_description TEXT,
  keyword TEXT,
  seo_score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'published',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);
`)
