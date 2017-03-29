import request from 'request'

export default class articleController {
  static index(req, res, next) {
    res.render('index', { title: 'CMA' })
  }

  static article(req, res, next) {
    request(`http://localhost:3000/api/article/${req.params.id}`, (err, response, body) => {
      res.render('article', { article: JSON.parse(body) })
    })
  }
}
