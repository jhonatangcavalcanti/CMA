import articleController from '../controllers/articleController'
import express from 'express'
const router = express.Router()

/* GET articles listing. */
router.get('/', articleController.index)

router.get('/:id', articleController.article)

export default router
