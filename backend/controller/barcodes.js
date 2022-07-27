const barcodeModel = require('../models/barcodes');
const barcodeTransactionModel = require('../models/barcodetransaction')
const { barcodeSearchQuery } = require('../query/barcodes');
const util = require('../util/index');
const ValidationSchema = require('../validtors/index')

const getBarcodes = async (req, res, next) => {
    try {
        const { page, count = 10, storeId, purchaseId, variantId, productId } = req.query;
        const paginationOption = util.paginateOptions(Number(page), count);
        let query = { storeId };

        if (purchaseId) {
            query = { ...query, 'purchaseId': util.getObjectId(purchaseId) }
        }
        // if (variantId) {
        //     query = { ...query, 'variantId': util.getObjectId(variantId) }
        // }
        // if (productId) {
        //     query = { ...query, 'productId': util.getObjectId(productId) }
        // }
        const existingdata = await barcodeTransactionModel.paginate(query, paginationOption)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}



const searchBarcode = async (req, res, next) => {
    try {
        const { barcode, storeId } = req.params;
        let query = { barcode: barcode.toString() };
        let agregateQuery = barcodeSearchQuery(query)
        const existingdata = await barcodeModel.aggregate(agregateQuery)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const getBarcode = async (req, res, next) => {
    try {
        const { barcode, storeId } = req.params;
        let query = { barcode: barcode.toString() };
        let agregateQuery = barcodeSearchQuery(query);
        const existingdata = await barcodeModel.aggregate(agregateQuery)
        res.status(200).json(existingdata.length ? existingdata[0] : {})
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const addBarcode = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.barcodeSchema, reqBody);
        if (value) {

            let id = null;
            let data = null;
            const barcodeInfo = await barcodeModel.findOne({ barcode: reqBody.barcode });
            if (barcodeInfo) {
                id = barcodeInfo._id;
                data = barcodeInfo;
                await barcodeModel.findByIdAndUpdate(id,{$inc: {qty: reqBody.qty}})
            } else {
                let barcodeModelObj = new barcodeModel(reqBody);
                const barcodedata = await barcodeModelObj.save();
                id = barcodedata._id;
                data = barcodedata;
            }

            const barcodeTranscationModalObj = new barcodeTransactionModel(
                {
                    barcodeId: id,
                    barcode: reqBody.barcode,
                    purchaseProductId: reqBody.purchaseProductId,
                    purchaseId: reqBody.purchaseId,
                    qty: reqBody.qty,
                    storeId: reqBody.storeId,
                }
            );
             await barcodeTranscationModalObj.save();

            res.status(200).json(data)
        }

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message })
    }
}


const updateBarcode = async (req, res, next) => {

    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.barcodeSchema, reqBody);
        if (value) {
            const { id } = req.params;
            const data = await barcodeModel.findByIdAndUpdate(id, req.body)
            res.status(200).json(data)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

}

const deleteBarcode = async (req, res, next) => {
    try {
        const { id, storeId } = req.params;
        const data = await barcodeModel.findByIdAndRemove(id)
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

module.exports = {
    getBarcodes,
    getBarcode,
    addBarcode,
    updateBarcode,
    deleteBarcode,
    searchBarcode
}