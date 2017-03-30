import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import path from 'path'
// import favicon from 'favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import mongoose from 'mongoose'

import api from './routes/api'

const app = express()

// setting database
// MONGODB will be defined when env is set to production
console.log(process.env.NODE_ENV, process.env.MONGO_DB_TEST_URL, process.env.MONGO_DB_TEST_URL)
const mongoDB = process.env.NODE_ENV == 'test' && process.env.MONGO_DB_TEST_URL ||
                process.env.NODE_ENV == 'development' && process.env.MONGO_DB_DEV_URL
console.log(mongoDB)
mongoose.Promise = global.Promise // resolves promise warning
mongoose.connect(mongoDB)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error'))

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'))
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
if (process.env.NODE_ENV == 'development') {
  app.use(logger('dev'))
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/', (req, res) => res.redirect('/api'))
app.use('/api', api)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send(err) // TODO: verify errors
  // res.render('error')
})

// module.exports = app
export default app
