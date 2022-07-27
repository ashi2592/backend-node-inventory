const purchasesModel = require('../models/purchases');
const purchasesProductModel = require('../models/purchases-products');
const { purchaseTransactionQuery, purchaseDetailsQuery } = require('../query/purchasetranscation');

// const barcodeModel = require('../models/barcodes')

// const orderType = 'purchased';


const util = require('../util/index');
const ValidationSchema = require('../validtors/index')

/**
 *  get pur
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

const getPurchasedTransactions = async (req, res, next) => {
    try {
        const { page = 1, count = 10, storeId } = req.query;
        let query = { storeId };
        const paginationOption = util.paginateOptions(Number(page), count);
        const productQuery = purchaseTransactionQuery(query)
        var myAggregate = purchasesModel.aggregate(productQuery);
        const existingdata = await purchasesModel.aggregatePaginate(myAggregate, paginationOption)
        console.log(existingdata)
        console.log(query)

        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const getPurchasedbyId = async (req, res, next) => {
    try {
        const { id, storeId } = req.params;
        let query = { _id: util.getObjectId(id) };
        const productQuery = purchaseDetailsQuery(query)
        const existingdata = await purchasesModel.aggregate(productQuery);

        res.status(200).json(existingdata.length ? existingdata[0] : {})
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}



const addPurchaseTranscation = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.purchaseSchema, reqBody);
        if (value) {
            let purchasesModelObj = new purchasesModel(reqBody);
            purchasesModelObj.storeId = reqBody.storeId;
            const ppdata = await purchasesModelObj.save();

            let products = await reqBody.products.map(x => {
                x.purchaseId = ppdata._id;

                return x;
            })

            await purchasesProductModel.insertMany(products)
            res.status(200).json(purchasesModelObj)
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const cancelPuchaseTransctionstatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        await purchasesModel.findByIdAndUpdate(id, { isCancel: true, status: false });
        res.status(200).json({ "message": "Successful" })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const confirmPuchaseTransctionstatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        await purchasesModel.findByIdAndUpdate(id, { status: true, isCancel: false });
        res.status(200).json({ "message": "Successful" })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const updatePurchasePrice = async (req, res, next) => {
    try {
        const { id } = req.params;
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.UpdatePurchaseProductSchema, reqBody);
        if (value) {
            await purchasesProductModel.purchasesProductModel(id, reqBody);
            // await purchasesModel.findByIdAndUpdate(id, );

        }
        res.status(200).json({ "message": "Successful" })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const PurchasedbyVariantId = async (req, res, next) => {
    try {
        const { id, storeId } = req.params;
        let query = { variantId: util.getObjectId(id) };
        const productQuery = purchaseDetailsQuery(query)
        const existingdata = await purchasesModel.aggregate(productQuery);
        res.status(200).json(existingdata.length ? existingdata[0] : {})
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const Purchasedbysupplier = async (req, res, next) => {
    try {
        const { page = 1, count = 10, supplier } = req.query;
        let query = { supplier };
        const paginationOption = util.paginateOptions(Number(page), count);
        const productQuery = purchaseTransactionQuery(query)
        var myAggregate = purchasesModel.aggregate(productQuery);
        const existingdata = await purchasesModel.aggregatePaginate(myAggregate, paginationOption)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}



module.exports = {
    addPurchaseTranscation,
    getPurchasedTransactions,
    cancelPuchaseTransctionstatus,
    confirmPuchaseTransctionstatus,
    getPurchasedbyId,
    updatePurchasePrice,
    Purchasedbysupplier
}