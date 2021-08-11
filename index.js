const PORT = 3000
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db/db.js')
console.log(db.seed())
const jsonParser = bodyParser.json()
const app = express()
app.use(jsonParser)
app.get('/products', (req, res) => {
  // console.log("BODY::::", req.body)
  db.models.product.find().limit(5)
  .exec()
  .then((data) => {
    res.json(data)
  })
  .catch((err) => {
    console.log('you have an err', err)
    res.end()
  })
})
app.get('/products/:product_id/related', (req, res) => {
  // console.log("BODY::::", req.body)
  db.models.related.find().limit(5)
  .exec()
  .then((data) => {
    res.json(data)
  })
  .catch((err) => {
    console.log('you have an err', err)
    res.end()
  })
})
app.get('/products/:product_id', (req, res) => {
  // console.log("BODY::::", req.body)
  db.models.product.find().limit(5)
  .exec()
  .then((data) => {
    res.json(data)
  })
  .catch((err) => {
    console.log('you have an err', err)
    res.end()
  })
})
app.post('/products', (req, res) => {
  // console.log('body', req.body)
  res.sendStatus(201)
})
app.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}`)
})
