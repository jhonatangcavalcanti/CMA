import mongoose from 'mongoose'
import moment from 'moment'
import path from 'path'

const ArticleSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now }
})

ArticleSchema.virtual('image_path').get(() => {
  return path.join(__dirname, '..', '..', 'images', this._id)
})

ArticleSchema.virtual('date_formatted').get(() => {
  return moment(this.date).format('MMMM Do, YYYY')
})

ArticleSchema.virtual('url').get(() => {
  return `/api/article/${this._id}`
})

export default mongoose.model('Article', ArticleSchema)
