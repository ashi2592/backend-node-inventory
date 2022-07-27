const transcationsModel = require('../models/transcation');
const productModel = require('../models/products');
const barcodeModel = require('../models/barcodes')
const util = require('../util/index');
const ValidationSchema = require('../validtors/index');
const orderType = 'sale';

const getTransactions = async (req, res, next) => {
    try {
        const { page, count = 10,customer,storeId } = req.query;
        const paginationOption = util.paginateOptions(Number(page), count);
        let query = {orderType,storeId};
        if(customer){
            query = {...query,["customer._id"]: util.getObjectId(customer)}
        }
        const existingdata = await transcationsModel.paginate(query, paginationOption)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}




const getTransaction = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingdata = await transcationsModel.findById(id)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}



const addTranscation = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.transcationSchema, req.body);
        if (value) {
            let transcationsModelObj = new transcationsModel(req.body);
            transcationsModelObj.status = false;
            transcationsModelObj.orderType = orderType;
            transcationsModelObj.storeId = reqBody.storeId;
            await transcationsModelObj.save();
            res.status(200).json(transcationsModelObj)
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const updateTransctionstatus = async (req, res, next) => {
    try {
        let reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.transcationUpdateSchema, reqBody);
        if (value) {
            const { id } = req.params;
            const transcationInfo = await transcationsModel.findById(id);
            if (transcationInfo && reqBody.status) {
            //     const ids = transcationInfo.products.map(x => x.productId);
            //     let codes = transcationInfo.products.map(x => x.barcode);
            //     let usedCodes = [];
            //     // console.log(codes)
            //     codes.map((code) => {
            //         usedCodes = [...usedCodes, ...codes]
            //     })
            //     //  console.log(usedCodes)
            //    const data = await usedCodes.map(async (x)=>{
            //         await barcodeModel.deleteOne({ barcode:x});
            //         return x;
            //     })
               
            //     await Promise.all(data);

               
                await transcationsModel.findByIdAndUpdate(id, reqBody);

            }
            else if (transcationInfo && reqBody.status == false) {
                // const barcodesObjs = transcationInfo.products.map(x => ({ productId: x.productId, barcode: x.codes, storeId: reqBody.storeId }));
                // await barcodeModel.insertMany(barcodesObjs)
                // await transcationsModel.findByIdAndUpdate(id, {status: false});
            
            }
            res.status(200).json(transcationInfo)
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}



const updateTranscation = async (req, res, next) => {

    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.transcationSchema, reqBody);
        if (value) {
            const { id } = req.params;
            const data = await transcationsModel.findByIdAndUpdate(id, req.body)
            res.status(200).json(data)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

}

const deleteTranscation = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await transcationsModel.findByIdAndDelete(id)
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


const refundProductTranscation = async (req, res, next) => {
    try {
        const { id } = req.params;

        const value = await util.ValidateData(ValidationSchema.returnProductSchema, req.body);
        if (value) {

            const { codes, previousCode, storeId, productId } = req.body;
            await transcationsModel.updateMany({
                _id: util.getObjectId(id),
                "products.productId": util.getObjectId(productId)
            }, {
                $set: {
                    "products.$.saleStatus": "exchange",
                    isExchangeApplied: true,
                    codes: codes
                }
            }, { multi: false })

            const barcodesObjs = [{ productId: productId, barcode: codes, storeId }]
            await barcodeModel.insertMany(barcodesObjs)
            await barcodeModel.deleteMany({ barcode: previousCode,productId: productId})

            const existingdata = await transcationsModel.findById(id)
            res.status(200).json(existingdata)
        } else {
            res.status(404).json({ message: "not found" })
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const exchangeProductTranscation = async (req, res, next) => {
    try {
        const { transcationId } = req.params;
        const { codes, storeId, productId } = req.body;

        if (transcationId && productId) {

            await transcationsModel.updateMany({
                _id: util.getObjectId(transcationId),
                "products.productId": util.getObjectId(productId)
            }, {
                $set: {
                    "products.$.saleStatus": "exchange",
                    isExchangeApplied: true
                }
            }, { multi: false })

            const barcodesObjs = [{ productId: productId, codes: codes, storeId }]
            await barcodeModel.insertMany(barcodesObjs)
            const existingdata = await transcationsModel.findById(id)
            res.status(200).json(existingdata)
        } else {
            res.status(404).json({ message: "not found" })
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    getTransactions,
    getTransaction,
    addTranscation,
    updateTranscation,
    deleteTranscation,
    updateTransctionstatus,
    refundProductTranscation,
}