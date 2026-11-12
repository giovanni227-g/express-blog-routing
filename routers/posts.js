const express = require('express')
const connection = require('../db')

const router = express.Router()

// Index
router.get('/', (req, res, next) => {
  const sql = 'SELECT * FROM posts'

  connection.query(sql, (err, results) => {
    if (err) {
      return next(err)
    }

    res.json(results)
  })
})

// Show
router.get('/:id', (req, res, next) => {
  const sql = `
    SELECT posts.*, GROUP_CONCAT(tags.label) AS tags
    FROM posts
    LEFT JOIN post_tag ON posts.id = post_tag.post_id
    LEFT JOIN tags ON tags.id = post_tag.tag_id
    WHERE posts.id = ?
    GROUP BY posts.id
  `

  connection.query(sql, [req.params.id], (err, results) => {
    if (err) {
      return next(err)
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Post non trovato' })
    }

    const post = results[0]
    post.tags = post.tags ? post.tags.split(',') : []
    res.json(post)
  })
})

// Delete
router.delete('/:id', (req, res, next) => {
  const sql = 'DELETE FROM posts WHERE id = ?'

  connection.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Post non trovato' })
    }

    res.sendStatus(204)
  })
})

module.exports = router
