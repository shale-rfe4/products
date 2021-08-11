const csv = require('csvtojson')
const mongoose = require('mongoose');
const m = new mongoose.Mongoose();
m.connect('mongodb://localhost:27017/sdcShale',
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
const featuresSchema = m.Schema({
  id: 'string',
  product_id: 'string',
  feature: 'string',
  value: 'string'
})
const featuresModel = m.model('Features', featuresSchema)
const photosSchema = m.Schema({
  id: 'string',
  styleId: 'string',
  url: 'string',
  thumbnail_url: 'string'
})
const photosModel = m.model('Photos', photosSchema)
const relatedSchema = m.Schema({
  id: 'string',
  current_product_id: 'string',
  related_product_id: 'string'
})
const relatedModel = m.model('Related', relatedSchema)
async function seedDB() {
  const products = await processCSV('./csv/product.csv', productModel)
  const styles = await processCSV('./csv/styles.csv', stylesModel)
  const skus = await processCSV('./csv/skus.csv', skusModel)
  const photos = await processCSV('./csv/photos.csv', photosModel)
  const related = await processCSV('./csv/related.csv', relatedModel)
  const features = await processCSV('./csv/features.csv', featuresModel)
}
function processCSV(csvFilePath, model) {
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
    features: featuresModel
  }
}