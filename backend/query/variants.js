
const util = require('../util/index')
exports.variantAggreateQuery = (query) => {
  return [
    {
      '$match': query
    }, {
      '$lookup': {
        'from': 'colors',
        'localField': 'productColor',
        'foreignField': '_id',
        'as': 'productColorObj'
      }
    }, {
      '$lookup': {
        'from': 'types',
        'localField': 'productType',
        'foreignField': '_id',
        'as': 'productTypeObj'
      }
    }, {
      '$lookup': {
        'from': 'sizes',
        'localField': 'productSize',
        'foreignField': '_id',
        'as': 'productSizeObj'
      }
    }, {
      '$lookup': {
        'from': 'productLengths',
        'localField': 'productLength',
        'foreignField': '_id',
        'as': 'productLengthObj'
      }
    }, {
      '$lookup': {
        'from': 'patterns',
        'localField': 'productPattern',
        'foreignField': '_id',
        'as': 'productPatternObj'
      }
    }, {
      '$unwind': {
        'path': '$productPatternObj',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$unwind': {
        'path': '$productLengthObj',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$unwind': {
        'path': '$productSizeObj',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$unwind': {
        'path': '$productTypeObj',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$unwind': {
        'path': '$productColorObj',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$lookup': {
        'from': 'barcodes',
        'localField': '_id',
        'foreignField': 'variantId',
        'as': 'barcodes'
      }
    },{
      "$unwind":
      {
        path: "$barcodes",
        preserveNullAndEmptyArrays: true
      }
    }, {
      '$group': {
        '_id': '$_id',
        'productId': {
          '$first': '$productId'
        },
        'articleNo': {
          '$first': '$articleNo'
        },
        'productColor': {
          '$first': '$productColor'
        },
        'productType': {
          '$first': '$productType'
        },
        'productSize': {
          '$first': '$productSize'
        },
        'productPattern': {
          '$first': '$productPattern'
        },
        'productLength': {
          '$first': '$productLength'
        },
        'storeId': {
          '$first': '$storeId'
        },
        'status': {
          '$first': '$status'
        },
        'createdAt': {
          '$first': '$createdAt'
        },
        'productColorObj': {
          '$first': '$productColorObj'
        },
        'productTypeObj': {
          '$first': '$productTypeObj'
        },
        'productSizeObj': {
          '$first': '$productSizeObj'
        },
        'productPatternObj': {
          '$first': '$productPatternObj'
        },
        'productLengthObj': {
          '$first': '$productLengthObj'
        },
        
        'qty': {
          '$sum': '$barcodes.qty'
        }
      }
    }

  ]
}


exports.variantWisePurchase = (query) => {

  return [
     {
      '$lookup': {
        'from': 'purchases',
        'localField': 'purchaseId',
        'foreignField': '_id',
        'as': 'purchases'
      }
    }, {
      '$unwind': {
        'path': '$purchases',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$lookup': {
        'from': 'suppliers',
        'localField': 'purchases.supplier',
        'foreignField': '_id',
        'as': 'purchases.supplier'
      }
    }, {
      '$unwind': {
        'path': '$purchases.supplier',
        'preserveNullAndEmptyArrays': true
      }
    }
  ]
}


exports.variantTranscation = (id)=>{

  return [
    {
        '$match': {
            'products.variantId':id
        }
    }, {
        '$unwind': {
            'path': '$products', 
            'preserveNullAndEmptyArrays': true
        }
    }, {
        '$match': {
            'products.variantId': id
        }
    }
]
}