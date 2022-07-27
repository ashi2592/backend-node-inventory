const productModel = require('../models/products');
const { ProductAggreateQuery, barcodeSearchQuery, ProductAggreateQueryforSingle } = require('../query/products');
const util = require('../util/index');
const ValidationSchema = require('../validtors/index');

const addProduct = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.productSchema, reqBody);
        if (value) {
            let productModelObj = new productModel(reqBody);
            await productModelObj.save()
            res.status(200).json(productModelObj)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}




const getProducts = async (req, res, next) => {
    try {
        const { page, count = 10, storeId, brand, category, type, color, size, supplier } = req.query;
        let query = { storeId };
        if (brand) {
            query = { ...query, 'productBrand': util.getObjectId(brand) }
        }
        if (category) {
            query = { ...query, 'productCategory': util.getObjectId(category) }
        }
        const paginationOption = util.paginateOptions(Number(page), count);
        const productQuery = ProductAggreateQuery(query)
        var myAggregate = productModel.aggregate(productQuery);
        const existingdata = await productModel.aggregatePaginate(myAggregate, paginationOption)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const searchProduct = async (req, res, next) => {
    try {
        const { searchText } = req.query;
        const existingdata = await productModel.find({ "$or": [{ productCode: { '$regex': searchText } }, { productName: { '$regex': searchText } }] }).limit(10)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const getProduct = async (req, res, next) => {
    try {
        const { id, storeId } = req.params;
        // var myAggregate = productModel.aggregate();
        let query = ProductAggreateQueryforSingle(util.getObjectId(id))
        const existingdata = await productModel.aggregate(query)
        res.status(200).json(existingdata.length > 0 ? existingdata[0] : {})
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const getProductBybarcode = async (req, res, next) => {
    try {
        const { id } = req.params;
        const myQuery = barcodeSearchQuery(id)
        const existingdata = await productModel.aggregate(myQuery)
        res.status(200).json(existingdata.length > 0 ? existingdata[0] : {})
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}



const updateProduct = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.productSchema, reqBody);
        if (value) {
            const { id } = req.params;
            const data = await productModel.findByIdAndUpdate(id, req.body)
            let query = ProductAggreateQueryforSingle(util.getObjectId(id))
            const existingdata = await productModel.aggregate(query)
            res.status(200).json(existingdata.length > 0 ? existingdata[0] : {})
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

}


const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await productModel.findByIdAndDelete(id)
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: "not found" })
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

}


const getProductAvailiabity = async (req, res, next) => {
    try {
        const { ids } = req.query;
        const productIds = ids.split(',');
        const productsInfo = await productModel.find(
            { _id: { '$in': productIds } },
            { productQty: 1, _id: 1 },
        );
        res.status(200).json({ availability: productsInfo })


    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    searchProduct,
    getProductAvailiabity,
    getProductBybarcode
}