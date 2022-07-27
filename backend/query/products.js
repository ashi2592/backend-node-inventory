exports.ProductAggreateQuery = (query) => {
  return [
    {
      '$match': query
    }, {
      '$lookup': {
        'from': 'categories',
        'localField': 'productCategory',
        'foreignField': '_id',
        'as': 'productCategoryObj'
      }
    },
    {
      '$unwind': {
        'path': '$productCategoryObj',
        'preserveNullAndEmptyArrays': true
      }
    },
    {
      '$lookup': {
        'from': 'brands',
        'localField': 'productBrand',
        'foreignField': '_id',
        'as': 'productBrandObj'
      }
    },
    {
      '$unwind': {
        'path': '$productBrandObj',
        'preserveNullAndEmptyArrays': true
      }
    }
  ]
}


exports.ProductAggreateQueryforSingle = (id) => {
  return [
    {
      "$match": { "_id": id }
    },
    {
      '$lookup': {
        'from': 'categories',
        'localField': 'productCategory',
        'foreignField': '_id',
        'as': 'productCategoryObj'
      }
    },
    {
      '$unwind': {
        'path': '$productCategoryObj',
        'preserveNullAndEmptyArrays': true
      }
    },
    {
      '$lookup': {
        'from': 'types',
        'localField': 'productType',
        'foreignField': '_id',
        'as': 'productTypeObj'
      }
    },
    {
      '$unwind': {
        'path': '$productTypeObj',
        'preserveNullAndEmptyArrays': true
      }
    },
    {
      '$lookup': {
        'from': 'sizes',
        'localField': 'productSize',
        'foreignField': '_id',
        'as': 'productSizeObj'
      }
    }, {
      '$unwind': {
        'path': '$productSizeObj',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$lookup': {
        'from': 'brands',
        'localField': 'productBrand',
        'foreignField': '_id',
        'as': 'productBrandObj'
      }
    }, {
      '$unwind': {
        'path': '$productBrandObj',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$lookup': {
        'from': 'suppliers',
        'localField': 'productSupplier',
        'foreignField': '_id',
        'as': 'productSupplierObj'
      }
    }, {
      '$unwind': {
        'path': '$productSupplierObj',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$lookup': {
        'from': 'colors',
        'localField': 'productColor',
        'foreignField': '_id',
        'as': 'productColorObj'
      }
    }, {
      '$unwind': {
        'path': '$productColorObj',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$lookup': {
        from: 'barcodes',
        localField: '_id',
        foreignField: 'productId',
        as: 'barcodes'
      }
    }
  ]
}


exports.topSellingProduct = (storeId, orderType = 'sale') => {

  return [
    {
      "$match": {
        "storeId": storeId,
        orderType: orderType
      }
    },
    {
      '$group': {
        '_id': '$products.productId',
        'sum': {
          '$sum': 1
        },
        'productCategory': {
          '$first': '$products.productCategory'
        },
        'productColor': {
          '$first': '$products.productColor'
        },
        'productSize': {
          '$first': '$products.productSize'
        },
        'productBrand': {
          '$first': '$products.productBrand'
        },
        'productName': {
          '$first': '$products.productName'
        }
      }
    }, {
      '$project': {
        'productId': {
          '$arrayElemAt': [
            '$_id', 0
          ]
        },
        'productName': {
          '$arrayElemAt': [
            '$productName', 0
          ]
        },
        'productBrand': {
          '$arrayElemAt': [
            '$productBrand', 0
          ]
        },
        'productSize': {
          '$arrayElemAt': [
            '$productSize', 0
          ]
        },
        'productColor': {
          '$arrayElemAt': [
            '$productColor', 0
          ]
        },
        'productCategory': {
          '$arrayElemAt': [
            '$productCategory', 0
          ]
        },
        'count': '$sum'
      }
    }, {
      '$lookup': {
        'from': 'categories',
        'localField': 'productCategory',
        'foreignField': '_id',
        'as': 'productCategoryObj'
      }
    }, {
      '$unwind': {
        'path': '$productCategoryObj',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$lookup': {
        'from': 'sizes',
        'localField': 'productSize',
        'foreignField': '_id',
        'as': 'productSizeObj'
      }
    }, {
      '$unwind': {
        'path': '$productSizeObj',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$lookup': {
        'from': 'brands',
        'localField': 'productBrand',
        'foreignField': '_id',
        'as': 'productBrandObj'
      }
    }, {
      '$unwind': {
        'path': '$productBrandObj',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$lookup': {
        'from': 'colors',
        'localField': 'productColor',
        'foreignField': '_id',
        'as': 'productColorObj'
      }
    }, {
      '$unwind': {
        'path': '$productColorObj',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$project': {
        'productId': 1,
        'productName': 1,
        'productBrand': 1,
        'productSize': 1,
        'productColor': 1,
        'productCategory': 1,
        'count': 1,
        'productBrandName': '$productBrandObj.brandName',
        'productCategoryName': '$productCategoryObj.categoryName',
        'productColorName': '$productColorObj.colorName',
        'productSizeName': '$productSizeObj.sizeName'
      }
    }
  ]
}

exports.dayWiseSells = (storeId, orderType = 'sale') => {
  return [
    {
      "$match": {
        "storeId": storeId,
        orderType,
        status: true

      }
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt"
          }
        },
        totalSaleAmount: {
          $sum: "$totalPrice"
        },
        averageQuantity: {
          $sum: "$totalQty"
        },
        averageProfit: {
          $sum: "$totalProfit"
        }
      }
    },
    {
      $limit: 10
    }

  ]
}


exports.monthWiseSale = (storeId, orderType = 'sale') => {
  return [
    {
      "$match": {
        "storeId": storeId,
        orderType,
        status: true

      }
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m",
            date: "$createdAt"
          }
        },
        totalSaleAmount: {
          $sum: "$totalPrice"
        },
        averageQuantity: {
          $sum: "$totalQty"
        },
        averageProfit: {
          $sum: "$totalProfit"
        }
      }
    },
    {
      $limit: 10
    }

  ]
}


exports.categoryWiseCount = (storeId) => {
  return [{
    "$match": {
      "storeId": storeId,
    }
  },
  {
    '$lookup': {
      'from': 'categories',
      'localField': 'productCategory',
      'foreignField': '_id',
      'as': 'productCategoryObj'
    }
  }, {
    '$lookup': {
      'from': 'barcodes',
      'localField': '_id',
      'foreignField': 'productId',
      'as': 'proBarcodes'
    }
  }, {
    '$unwind': {
      'path': '$productCategoryObj'
    }
  }, {
    '$group': {
      '_id': {
        'categoryName': '$productCategoryObj.categoryName'
      },
      'count': {
        '$sum': {
          '$size': '$proBarcodes'
        }
      }
    }
  }, {
    '$project': {
      'categoryName': '$_id.categoryName',
      'count': '$count'
    }
  }
  ]
}