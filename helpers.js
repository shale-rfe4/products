async function parseData(data) {
    for (var i = 0; i < data.length; i++) {
    var product_id = data[i].productId
    var results = [{
      style_id: data[i].style_id,
      name: data[i].name,
      sale_price: data[i].sale_price,
      original_price: data[i].original_price,
      default_style: data[i].default_style,
      photos: data[i].photos.map((photo,index) => ({
        thumbnail_url: photo.thumbnail_url,
        url: photo.url
      })) || [],
      skus: data[i].skus.reduce((accum, sku, index) => {
        accum[sku.id] = {
            size: sku.size,
            quantity: sku.quantity
        }
        return accum
      }, {}) || {}
    }]
  }
  return {
    product_id,
    results,
  }
}
module.exports = {
  parseData
}