const express = require('express')
const postsRouter = require('./routers/posts')

const app = express()
const port = 3000

// Rende accessibili i file presenti nella cartella public
app.use(express.static('public'))

// Home
app.get('/', (req, res) => {
  res.send('Server del mio blog')
})

// Rotte dei post
app.use('/posts', postsRouter)

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`)
})
