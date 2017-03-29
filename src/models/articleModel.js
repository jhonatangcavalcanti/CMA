import mongoose from 'mongoose'

const ArticleSchema = mongoose.Schema({
  title: { type: String, required: true },
  image_path: { type: String },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now }
})

ArticleSchema.virtual('url').get(() => {
  return `/api/article/${this._id}`
})

export default mongoose.model('Article', ArticleSchema)
