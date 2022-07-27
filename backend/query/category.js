exports.CategoryAggreateQuery = (query) => {
    return [
      {
        "$match": query
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
     
    ]
  }