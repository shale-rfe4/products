const PORT = 8080
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db/db.js')
console.log(db.seed())
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
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
  //change product => productFeatures
  //create index on ProductID
  db.models.productFeatures.find(
          {"id": "1"},
          {"_id": 0, "features._id": 0, "features.id": 0, "features.product_id": 0}
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
  // console.log("BODY::::", req.body)
  db.models.allStyles.find()
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
  console.log(`Server is listening on Port:${PORT}`)
})

// db.products.aggregate([{
//   $lookup: {
//     from: "features",
//     localField: "id",
//     foreignField: "id",
//     as: "features"
// }
// },
// {$out:  "productFeatures"
// }])

// db.styles.aggregate([
//   {$lookup: {
//     from: 'photos',
//     localField: 'id',
//     foreignField: 'styleId',
//     as: 'photos'
//   }},
//   {$lookup: {
//     from: 'skus',
//     localField: 'id',
//     foreignField: 'styleId',
//     as: 'skus'
//   }},
//   {$out: 'allStyles'}
// ])

// {
//   "$group": {
//       "_id": { "id": "$id"},
//       "uniqueIds": { "$addToSet": "$id" },
//       "count": { "$sum": 1 }
//   }
// },
// { "$match": { "count": { "$gt": 1 } } },
// {"$sort": {
//     "count": -1
//     }
// },
// db.styles.aggregate([
//   {$lookup: {
//     from: 'photos',
//     localField: 'id',
//     foreignField: 'styleId',
//     as: 'photos'
//   }},
//   {$unwind: {
//     path: '$photos',
//     preserveNullAndEmptyArrays: true
//   }},
//   {$lookup: {
//     from: 'skus',
//     localField: 'id',
//     foreignField: 'styleId',
//     as: 'skus'
//   }},
//   {$unwind: {
//     path: '$skus',
//     preserveNullAndEmptyArrays: true
//   }},
//   {$out: 'allStyles'}
// ])
