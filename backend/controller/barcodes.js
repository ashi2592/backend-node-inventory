const barcodeModel = require('../models/barcodes');
const util = require('../util/index');
const ValidationSchema = require('../validtors/index')

const getBarcodes = async (req, res, next) => {
    try {
        const { page, count = 10, storeId} = req.query;
        const paginationOption = util.paginateOptions(Number(page), count);
        const existingdata = await barcodeModel.paginate({storeId}, paginationOption)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const getBarcode = async (req, res, next) => {
    try {
        const { id,storeId } = req.params;
        const existingdata = await barcodeModel.findById(id)
        res.status(200).json(existingdata)
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
            let barcodeModelObj = new barcodeModel();
            barcodeModelObj.barcode = reqBody.barcode;
            barcodeModelObj.productId = reqBody.productId;
            barcodeModelObj.status = true;
            barcodeModelObj.storeId = reqBody.storeId
            await barcodeModelObj.save()
            res.status(200).json(barcodeModelObj)
        }

    }
    catch (err) {
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
        const { barcode,storeId } = req.params;
        const data = await barcodeModel.findOneAndRemove({barcode,storeId})
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
    deleteBarcode
}