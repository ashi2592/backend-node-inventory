const transcationsModel = require('../models/transcation');
const productModel = require('../models/products')
const util = require('../util/index');
const ValidationSchema = require('../validtors/index')
const orderType = 'purchased';

const getPurchasedTransactions = async (req, res, next) => {
    try {
        const { page, count = 10 } = req.query;
        const paginationOption = util.paginateOptions(Number(page), count);
        const existingdata = await transcationsModel.paginate({orderType: orderType}, paginationOption)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const addPurchaseTranscation = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.transcationSchema, req.body);
        if (value) {
            let transcationsModelObj = new transcationsModel(req.body);
            transcationsModelObj.status = false;
            transcationsModelObj.orderType = orderType;
            await transcationsModelObj.save();
            res.status(200).json(transcationsModelObj)
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const updatePuchaseTransctionstatus = async (req, res, next) => {
    try {
        let reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.transcationUpdateSchema, reqBody);
        if (value) {
            const { id } = req.params;
            const transcationInfo = await transcationsModel.findByIdAndUpdate(id, reqBody);
            if (transcationInfo && reqBody.status) {
                const ids = transcationInfo.products.map(x => x.productId);
                const newdata = await productModel.updateMany({ _id: { '$in': ids } }, { $inc: { productQty: 1 } });
            }
            res.status(200).json({ "message": "Successful" })
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


module.exports = {
    addPurchaseTranscation,
    updatePuchaseTransctionstatus,
    getPurchasedTransactions
}