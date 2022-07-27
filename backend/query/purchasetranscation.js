
exports.purchaseDetailsQuery = (query) => {

    return [
      {
        "$match":query
      },
      {
        '$lookup': {
          'from': 'suppliers', 
          'localField': 'supplier', 
          'foreignField': '_id', 
          'as': 'supplier'
        }
      }, {
        '$unwind': {
          'path': '$supplier', 
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$lookup': {
          'from': 'purchaseproducts', 
          'localField': '_id', 
          'foreignField': 'purchaseId', 
          'as': 'products'
        }
      }
    ]
  }


  exports.purchaseTransactionQuery = (query) => {

    return [
      {
        "$match": query
      },

      {
        '$lookup': {
          'from': 'suppliers', 
          'localField': 'supplier', 
          'foreignField': '_id', 
          'as': 'supplier'
        }
      }, {
        '$unwind': {
          'path': '$supplier', 
          'preserveNullAndEmptyArrays': true
        }
      }
    ]
  }