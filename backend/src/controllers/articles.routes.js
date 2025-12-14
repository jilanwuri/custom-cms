import express from 'express'
import {
  createArticle,
  getArticles,
  getArticleBySlug
} from '../controllers/articles.controller.js'

const router = express.Router()

router.post('/', createArticle)
router.get('/', getArticles)
router.get('/:slug', getArticleBySlug)

export default router
