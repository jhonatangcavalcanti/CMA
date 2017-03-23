import express from 'express'
const router = express.Router()

/* GET articles listing. */
router.get('/', (req, res) => {
  res.send(`List of articles`)
})

router.get('/:id', (req, res) => {
  res.send(`Article ${req.params.id}`)
})

export default router
