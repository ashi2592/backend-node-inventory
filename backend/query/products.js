

exports.ProductAggreateQuery = [
            
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