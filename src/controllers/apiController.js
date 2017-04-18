import path from 'path'
import articleModel from '../models/articleModel'

//TODO: Handle errors

export default class apiController {

  static index(req, res, next) {
    res.send('API info: GET /articles to all articles or GET /article/:id to specific article')
  }

  static articles_list_get (req, res, next) {
    articleModel.find({}, (err, articles) => { // TODO: specify each err and test all
      if (err) return res.status(400).send(err) /*next(err)*/
      res.json(articles)
    })
  }

  static article_get (req, res, next) {
    articleModel.findById(req.params.id, (err, article) => {
      if (err) return res.status(400).send(err) /*next(err)*/
      if (article == null) return res.sendStatus(404)
      res.json(article)
    })
  }

  static article_get_image(req, res, next) {
    //TODO: handle errors
    articleModel.findById(req.params.id, (err, article) => {
      if (err) return res.status(400).send(err)
      const options = {
        root: path.join(__dirname, '..', '..', 'public', 'images'),
        headers: {
          'Content-Type': 'image/jpg' // TODO: set right content type of each file
        }
      }
      res.sendFile(article.image_id || '', options, (err) => {
        if (err) res.send(err)
        else console.log('Sent')
      })
    })
  }

  static get_image(req, res, next) {
    const options = {
      root: path.join(__dirname, '..', '..', 'public', 'images'),
      headers: {
        'Content-Type': 'image/jpg' // TODO: set right content type of each file
      }
    }
    res.sendFile(req.params.id, options, (err) => {
      if (err) res.send(err)
    })
  }

  static article_create_post (req, res, next) { // TODO: should validate data?
    //TODO: remove article.somthing, send article on body, like: title, content and image_id
    const article_data = JSON.parse(req.body.article)
    
    const article = new articleModel({
      title: article_data.title,
      content: article_data.content,
      image_id: req.file && req.file.filename || undefined //article_data.image_id
    })

    article.save((err) => {
      if (err) return res.status(400).send(err)
      res.json({article})
    })
  }

  static article_update_put(req, res, next) {
    articleModel.findById(req.params.id, (err, article) => {
      if (err) return res.status(400).send(err)
      const article_data = JSON.parse(req.body.article)
      if (!req.file) { // if not updating a new file, get old id
        article_data.image_id = article.image_id || ''
      } else {
        article_data.image_id = req.file.filename
      }
      // Object.assign(article, req.body).save((err, article) => {
      Object.assign(article, article_data).save((err, article) => {
        if (err) return res.status(400).send(err)

        res.json({article})
      })
    })
  }

  static article_delete(req, res, next) {
    articleModel.remove({ _id: req.params.id }, (err, result) => {
      if (err) return res.status(400).send(err)
      res.json(result)
    })
  }

}
