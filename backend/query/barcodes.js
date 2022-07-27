exports.barcodeSearchQuery = (query) => {

  return [
    {
      '$match': query
    }, {
      '$lookup': {
        'from': 'products', 
        'localField': 'productId', 
        'foreignField': '_id', 
        'as': 'product'
      }
    }, {
      '$unwind': {
        'path': '$product'
      }
    }
  ]
}




exports.BarcodeDetailsQuery = (query) => {

  return [
    {
      '$match': query
    }, {
      '$lookup': {
        'from': 'products',
        'localField': 'productId',
        'foreignField': '_id',
        'as': 'products'
      }
    }, {
      '$unwind': {
        'path': '$products',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$lookup': {
        'from': 'brands',
        'localField': 'products.productBrand',
        'foreignField': '_id',
        'as': 'products.brand'
      }
    }, {
      '$unwind': {
        'path': '$products.brand',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$lookup': {
        'from': 'categories',
        'localField': 'products.productCategory',
        'foreignField': '_id',
        'as': 'products.category'
      }
    }, {
      '$unwind': {
        'path': '$products.category',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$lookup': {
        'from': 'variants',
        'localField': 'variantId',
        'foreignField': '_id',
        'as': 'variants'
      }
    }, {
      '$unwind': {
        'path': '$variants',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$lookup': {
        'from': 'colors',
        'localField': 'variants.productColor',
        'foreignField': '_id',
        'as': 'variants.color'
      }
    }, {
      '$unwind': {
        'path': '$variants.color',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$lookup': {
        'from': 'types',
        'localField': 'variants.productType',
        'foreignField': '_id',
        'as': 'variants.type'
      }
    }, {
      '$unwind': {
        'path': '$variants.type',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$lookup': {
        'from': 'sizes',
        'localField': 'variants.productSize',
        'foreignField': '_id',
        'as': 'variants.size'
      }
    }, {
      '$unwind': {
        'path': '$variants.size',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$lookup': {
        'from': 'patterns',
        'localField': 'variants.productPattern',
        'foreignField': '_id',
        'as': 'variants.pattern'
      }
    }, {
      '$unwind': {
        'path': '$variants.pattern',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$lookup': {
        'from': 'productLengths',
        'localField': 'variants.productLength',
        'foreignField': '_id',
        'as': 'variants.productLength'
      }
    }, {
      '$unwind': {
        'path': '$variants.productLength',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$lookup': {
        'from': 'purchaseproducts',
        'localField': 'purchaseProductId',
        'foreignField': '_id',
        'as': 'purchaseproduct'
      }
    }, {
      '$unwind': {
        'path': '$purchaseproduct',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$lookup': {
        'from': 'purchases',
        'localField': 'purchaseproduct.purchaseId',
        'foreignField': '_id',
        'as': 'purchaseproduct.purchase'
      }
    }, {
      '$unwind': {
        'path': '$purchaseproduct.purchase',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$lookup': {
        'from': 'suppliers',
        'localField': 'purchaseproduct.purchase.supplier',
        'foreignField': '_id',
        'as': 'purchaseproduct.purchase.supplier'
      }
    }, {
      '$unwind': {
        'path': '$purchaseproduct.purchase.supplier',
        'preserveNullAndEmptyArrays': true
      }
    }
  ]
}


