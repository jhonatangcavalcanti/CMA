import mongoose from 'mongoose'
import moment from 'moment'

const ArticleSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image_id: { type: String },
  date: { type: Date, default: Date.now }
})

ArticleSchema.virtual('image_path').get(() => {
  return `/article/image/${this.image_id}`
})

ArticleSchema.virtual('date_formatted').get(() => {
  return moment(this.date).format('MMMM Do, YYYY')
})

ArticleSchema.virtual('url').get(() => {
  return `/api/article/${this._id}`
})

export default mongoose.model('Article', ArticleSchema)
