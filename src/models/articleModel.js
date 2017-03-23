import mongoose from 'mongoose'

const ArticleSchema = mongoose.Schema({
  title: { type: String, required: true },
  image_path: { type: String },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now }
})

export default mongoose.model('Article', ArticleSchema)
