const variantsModel = require('../models/variants');
const productPurchasesModel = require('../models/purchases-products');
const TransctionModel = require('../models/transcation');


const { barcodeSearchQuery } = require('../query/barcodes');
const { variantAggreateQuery, variantWisePurchase, variantTranscation } = require('../query/variants');
const util = require('../util/index');
const ValidationSchema = require('../validtors/index');

const getProductVariants = async (req, res, next) => {
    try {
        const { page=1, count = 10, storeId } = req.query;
        const { productId } = req.params;
        let query = { storeId, productId: util.getObjectId(productId) };
        const paginationOption = util.paginateOptions(Number(page), count);
        const productQuery = variantAggreateQuery(query);
        console.log(productQuery)
        var myAggregate = variantsModel.aggregate(productQuery);
        const existingdata = await variantsModel.aggregatePaginate(myAggregate, paginationOption)

        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const addVariant = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.variantProducts, reqBody);
        if (value) {
            let variantsModelObj = new variantsModel(reqBody);
            await variantsModelObj.save()
            res.status(200).json(variantsModelObj)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const updateVariant = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.variantProducts, reqBody);
        if (value) {
            const { id } = req.params;
            const data = await variantsModel.findByIdAndUpdate(id, req.body)
            res.status(200).json({ message: "updated" })
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

}


const deleteVariants = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await variantsModel.findByIdAndDelete(id)
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


const getTranscationVariants = async (req, res, next) => {
    try {
        const { page = 1, count = 10, storeId } = req.query;
        const { id } = req.params;
        const paginationOption = util.paginateOptions(Number(page), count);
        const variantTranscationQuery = variantTranscation(util.getObjectId(id))
        var myAggregate = TransctionModel.aggregate(variantTranscationQuery);

        const existingdata = await TransctionModel.aggregatePaginate(myAggregate, paginationOption)

        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const getPurchaseVariants = async (req, res, next) => {
    try {


        const { page = 1, count = 10, } = req.query;
        const { id } = req.params;
        const paginationOption = util.paginateOptions(Number(page), count);
        let query = { variantId: util.getObjectId(id) }
        const productQuery = variantWisePurchase(query);
        var myAggregate = productPurchasesModel.aggregate(productQuery);

        const existingdata = await productPurchasesModel.aggregatePaginate(myAggregate, paginationOption)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}



module.exports = {
    getProductVariants,
    addVariant,
    updateVariant,
    deleteVariants,
    getPurchaseVariants,
    getTranscationVariants
}