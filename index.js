const PORT = 8080
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db/db.js')
console.log(db.seed())
const mongo = require('mongodb');
const { parseData } = require('./helpers.js')
const MongoClient = mongo.MongoClient;
const jsonParser = bodyParser.json()
const app = express()
app.use(jsonParser)
app.get('/products', (req, res) => {
  // console.log('BODY::::', req.body)
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
  // console.log('BODY::::', req.body)
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
  // console.log('BODY::::', req.body)
  //change product => productFeatures
  //create index on ProductID




  db.models.productFeatures.find(
          {'id': '1'},
          {'_id': 0, 'features._id': 0, 'features.id': 0, 'features.product_id': 0}
        )

  .exec()
  .then((data) => {
    res.json(data)
  })
  .catch((err) => {
    console.log('you have an err', err)
    res.end()
  })
})
app.get('/products/:product_id/styles', (req, res) => {
  // console.log('BODY::::', req.body)
  console.log('body:::', req.params)
  db.models.allStyles.find()
  .exec()
  .then((data) => parseData(data))
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
  console.log(`Server is listening on Port:${PORT}`)
})
