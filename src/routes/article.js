import articleController from '../controllers/articleController'
import express from 'express'
const router = express.Router()

/* GET articles listing. */
router.get('/', articleController.index)

router.get('/all', articleController.allArticles)

router.get('/:id', articleController.article)


export default router
