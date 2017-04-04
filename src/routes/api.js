import express from 'express'
import multer from 'multer'
const upload = multer({ dest: 'public/images/' })
// import { articles_list_get, article_create_post, article_get } from '../controllers/apiController'
import apiController from '../controllers/apiController'

const router = express.Router()

router
  // Home page
  .get('/', apiController.index)
  // Return all articles
  .get('/articles', apiController.articles_list_get)
  // Return specific article
  .get('/article/:id', apiController.article_get)
  // Get image from article given id
  .get('/article/:id/image', apiController.article_get_image) // this
  // Get image given image id
  .get('/article/image/:id', apiController.get_image) // or this? or both?
  // Create new article
  .post('/article', apiController.article_create_post)
  // Update article given id
  .put('/article/:id', apiController.article_update_put)
  // Delete article given id
  .delete('/article/:id', apiController.article_delete)

export default router
