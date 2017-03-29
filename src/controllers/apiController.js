import articleModel from '../models/articleModel'

export default class apiController {

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

    const article = new articleModel({
      title: req.body.title,
      content: req.body.content
    })

    article.save((err) => {
      if (err) { return next(err) }
      console.log('Saved!')
      res.send(article)
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
