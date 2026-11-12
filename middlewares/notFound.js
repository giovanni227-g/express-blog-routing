function notFound(req, res, next) {
  res.status(404).send('Endpoint non trovato')
}

module.exports = notFound
