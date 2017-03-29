import server from '../../src/bin/www'
import Article from '../../src/models/articleModel'

import chai from 'chai'
import chaiHttp from 'chai-http'
// import router from '../../dist/routes/api'

chai.use(chaiHttp)

describe('API', () => {

  beforeEach((done) => {
    Article.remove({}, (err) => {
      if (err) { console.log(err) }
      done()
    })
  })

  describe('GET routes', () => {
    it('/api/articles returns list of articles', (done) => { // return 200? JSON?
      chai.request(server)
      .get(`/api/articles`)
      .end((err, res) => {
        // console.log(err)
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.eql(0)
        // expect(res.statusCode).toEqual(200)
        // expect(200).toEqual(res.status)
        // expect(Array.isArray(body)).toBe(true)
        done()
      })
    })

    it('/api/article/:id returns an article by the given ID', (done) => { // return 200? return JSON?
      let article = new Article({
        title: 'Test title',
        content: 'Test content',
        image_path: 'Test_image_path',
        date: Date.now()
      })
      article.save((err, article) => {
        chai.request(server)
          .get(`/api/article/${article.id}`)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.a('object')
            res.body.should.have.property('title')
            res.body.should.have.property('content')
            res.body.should.have.property('image_path')
            res.body.should.have.property('date')
            res.body.should.have.property('_id').eql(article.id)
            done()
          })
      })
    })

    it('/api/article/:id with inexisting ID returns 404', (done) => {
      chai.request(server)
      .get(`/api/article/58dbb01f2bd5c22412f8c305`)
      .end((err, res) => {
        res.should.have.status(404)
        done()
      })
    })

    it('/api/article/:id with invalid ID returns 400 with errors', (done) => {
      chai.request(server)
      .get(`/api/article/invalidId`)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('name').eql('CastError')
        res.body.should.have.property('kind').eql('ObjectId')
        res.body.should.have.property('value').eql('invalidId')
        done()
      })
    })

  })

  describe('POST routes', () => {
    it('/api/article should not POST a book without title and returns 200', (done) => {
      let article = {
        image_path: 'path of an image',
        content: 'Content test',
        date: Date.now
      }
      chai.request(server)
        .post('/api/article')
        .send(article)
        .end((err, res) => {
          res.should.have.status(400) // TODO: 200 or 400? or 206?
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          res.body.errors.should.have.property('title')
          res.body.errors.title.should.have.property('kind').eql('required')
          done()
        })
    })

    it('/api/article should not POST a book without content and returns 200', (done) => {
      let article = {
        image_path: 'path of an image',
        title: 'Content title',
        date: Date.now
      }
      chai.request(server)
        .post('/api/article')
        .send(article)
        .end((err, res) => {
          res.should.have.status(400) // TODO: 200 or 400? or 206?
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          res.body.errors.should.have.property('content')
          res.body.errors.content.should.have.property('kind').eql('required')
          done()
        })
    })

    it('/api/article should POST an article and returns 200 with the new article on body', (done) => {
      let article = {
        title: 'Test title',
        content: 'Test content',
        image_path: 'Test_image_path',
        date: Date.now
      }
      chai.request(server)
        .post('/api/article')
        .send(article)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          // res.body.should.have.property('message').
          res.body.article.should.have.property('title')
          res.body.article.should.have.property('content')
          res.body.article.should.have.property('image_path')
          res.body.article.should.have.property('date')
          done()
        })
    })

  })

  describe('PUT routes', () => {
    it('/api/article/:id returns one updated article', (done) => {
      let article = new Article({
        title: 'Test title',
        content: 'content',
        image_path: 'path',
        date: '2017-03-28T20:16:31.101Z'
      })
      article.save((err, article) => {
        chai.request(server)
          .put(`/api/article/${article.id}`)
          .send({title: 'New test title', content: 'content', image_path: 'path', date: '2017-03-28T20:16:31.101Z'})
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.a('object')
            res.body.should.have.property('title').eql('New test title')
            done()
          })
      })
    })
  })

  describe('DELETE routes', () => {
    it('/api/article/:id delete an article given an id', (done) => {
      let article = new Article({
        title: 'Test title',
        content: 'content',
        image_path: 'path',
        date: Date.now()
      })
      article.save((err, article) => {
        // console.log(err, article)
        chai.request(server)
          .delete(`/api/article/${article.id}`)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('ok').eql(1)
            res.body.should.have.property('n').eql(1)
            done()
          })
      })
    })
  })
})
