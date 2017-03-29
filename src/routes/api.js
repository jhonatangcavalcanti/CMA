import express from 'express'
// import { articles_list_get, article_create_post, article_get } from '../controllers/apiController'
import apiController from '../controllers/apiController'

const router = express.Router()

router
  // Home page
  .get('/', (req, res) => {
    res.send('API info')
  })
  // Return all articles
  .get('/articles', apiController.articles_list_get)
  // Return specific article
  .get('/article/:id', apiController.article_get)
  // Create new article
  .post('/article', apiController.article_create_post)
  // Update article given id
  .put('/article/:id', apiController.article_update_put)
  // Delete article given id
  .delete('/article/:id', apiController.article_delete)
  
export default router
