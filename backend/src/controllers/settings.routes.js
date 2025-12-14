import express from 'express'
import {
  getTheme,
  setTheme
} from '../controllers/settings.controller.js'

const router = express.Router()

router.get('/theme', getTheme)
router.post('/theme', setTheme)

export default router
