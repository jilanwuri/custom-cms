import express from 'express'
import cors from 'cors'

import articlesRoutes from './routes/articles.routes.js'
import settingsRoutes from './routes/settings.routes.js'

const app = express()

// middleware
app.use(cors())
app.use(express.json())

// routes
app.use('/api/articles', articlesRoutes)
app.use('/api/settings', settingsRoutes)

// health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

export default app
