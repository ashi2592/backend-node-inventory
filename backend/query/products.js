

exports.ProductAggreateQuery =(storeId) => {
   return [
    {
        "$match":{"storeId":storeId}
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



exports.barcodeSearchQuery = (barcode) => {
    
   return [{
    $lookup: {
        from: 'barcodes',
        localField: '_id',
        foreignField: 'productId',
        as: 'barcodes'
    }
}, {
    $unwind: {
        path: '$barcodes'
    }
}, {
    $match: {
        'barcodes.barcode': barcode.toString()
    }

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
}
]
}


exports.topSellingProduct = (storeId,orderType='sale') =>{

    return [
        {
            "$match":{"storeId":storeId}
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