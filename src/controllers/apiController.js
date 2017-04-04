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

    const article = new articleModel({
      title: req.body.title,
      content: req.body.content,
      date: req.body.date
    })

    article.save((err) => {
      if (err) return res.status(400).send(err) /*return next(err)*/
      res.json({article})
    })
  }

  static article_update_put(req, res, next) {
    articleModel.findById(req.params.id, (err, article) => {
      if (err) return res.status(400).send(err)
      Object.assign(article, req.body).save((err, article) => {
        if (err) return res.status(400).send(err)

        res.json(article)
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


// export { articles_list_get, article_create_post, article_get }
