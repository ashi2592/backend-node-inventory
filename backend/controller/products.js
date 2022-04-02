const productModel = require('../models/products');
const util = require('../util/index');
const ValidationSchema = require('../validtors/index')

const getProducts = async (req, res, next) => {
    try {
        const { page, count = 10 } = req.query;
        const paginationOption = util.paginateOptions(Number(page), count);
        const existingdata = await productModel.paginate({}, paginationOption)
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
        const { id } = req.params;
        const existingdata = await productModel.findById(id)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const addProduct = async (req, res, next) => {
    try {
        const reqBody = req.body;

        console.log(req.body)
        const value = await util.ValidateData(ValidationSchema.productSchema, req.body);
        if (value) {
            let productModelObj = new productModel(req.body);
            // productModelObj.productName = reqBody.productName;
            // productModelObj.status = reqBody.status;
            await productModelObj.save()
            res.status(200).json(productModelObj)
        }

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
            res.status(200).json(data)
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
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProduct,
    getProductAvailiabity
}