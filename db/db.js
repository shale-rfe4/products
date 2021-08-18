const csv = require('csvtojson')
const mongoose = require('mongoose');
const m = new mongoose.Mongoose();
m.connect('mongodb://localhost:27017/sdcShales',
{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const productsSchema = m.Schema({
  id: 'string',
  name: 'string',
  slogan: 'string',
  description: 'string',
  category: 'string',
  default_price: 'string'
})
const productModel = m.model('Product', productsSchema)
const featuresSchema = m.Schema({
  id: 'string',
  product_id: 'string',
  feature: 'string',
  value: 'string'
})
const featuresModel = m.model('Features', featuresSchema)
const productFeaturesSchema = m.Schema({
  id: 'string',
  name: 'string',
  slogan: 'string',
  description: 'string',
  category: 'string',
  default_price: 'string',
  features: [
    m.Schema.Types.Mixed
  ]
})
const productFeaturesModel = m.model('productFeatures', productFeaturesSchema, 'productFeatures')
const allStylesSchema = m.Schema({
  id: 'string',
  productId: 'string',
  name: 'string',
  sale_price: 'string',
  original_price: 'string',
  default_style: 'string',
  photos: [
    m.Schema.Types.Mixed
  ],
  skus: [
    m.Schema.Types.Mixed
  ]
})
const allStylesModel = m.model('allStyles', allStylesSchema, 'allStyles')
const stylesSchema = m.Schema({
  id: 'string',
  productId: 'string',
  name: 'string',
  sale_price: 'string',
  original_price: 'string',
  default_style: 'string'
})
const stylesModel = m.model('Styles', stylesSchema)
const skusSchema = m.Schema({
  id: 'string',
  styleId: 'string',
  size: 'string',
  quantity: 'string'
})
const skusModel = m.model('Skus', skusSchema)
const photosSchema = m.Schema({
  id: 'string',
  styleId: 'string',
  url: 'string',
  thumbnail_url: 'string'
})
// mongoimport --db=sdcShales --collection=styles --file=styles.csv
// /Users/melikacampbell/Documents/HRSeniorPhase/hr-rfe4-shale/csv/photos (2).csv
1
// mongoimport --type csv -d sdcShales -c photos --parseGrace skipField --headerline --drop ./csv/photos.csv
// mongoimport --type csv --parseGrace skipRow --file millionrecords.csv --headerline
const photosModel = m.model('Photos', photosSchema)
const relatedSchema = m.Schema({
  id: 'string',
  current_product_id: 'string',
  related_product_id: 'string'
})
const relatedModel = m.model('Related', relatedSchema)
async function seedDB() {
  // const products = await processCSV('./csv/product.csv', productModel)
  // const features = await processCSV('./csv/features.csv', featuresModel)
  // const styles = await processCSV('./csv/styles.csv', stylesModel)
  // const skus = await processCSV('./csv/skus.csv', skusModel)
  // const photos = await processCSV('./csv/photos.csv', photosModel)
  // const related = await processCSV('./csv/related.csv', relatedModel)
}
function processCSV(csvFilePath, model) {
  // console.log("FILE:::", csvFilePath)
  // console.log("MODEL:::", model)
  return csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    console.log('started', csvFilePath)
    return model.collection.insertMany(jsonObj, function (err) {
      if (err) {
        return console.log('you have an err:', err)
      } else {
        console.log('done')
      }
    })
  })
  .catch((err) => {
    console.log('you have an err in processCSV:', err)
    done()
  })
}
module.exports = {
  seed: seedDB,
  models: {
    product: productModel,
    styles: stylesModel,
    skus: skusModel,
    photos: photosModel,
    related: relatedModel,
    features: featuresModel,
    productFeatures: productFeaturesModel,
    allStyles: allStylesModel
  }
}