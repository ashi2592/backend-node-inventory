const transcationsModel = require('../models/transcation');
const productModel = require('../models/products')
const util = require('../util/index');
const ValidationSchema = require('../validtors/index')

const getTransactions = async (req, res, next) => {
    try {
        const { page, count = 10 } = req.query;
        const paginationOption = util.paginateOptions(Number(page), count);
        const existingdata = await transcationsModel.paginate({}, paginationOption)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

// const searchProduct = async (req, res, next) => {
//     try {
//         const { searchText } = req.query;
//         const existingdata = await productModel.find({"$or":[{productCode:  {'$regex':searchText}},{productName:  {'$regex':searchText}}]}).limit(10)
//         res.status(200).json(existingdata)
//     }
//     catch (err) {
//         res.status(400).json({ message: err.message })
//     }
// }

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
            const transcationInfo = await transcationsModel.findByIdAndUpdate(id, reqBody);


            if (transcationInfo && reqBody.status) {
                const ids = transcationInfo.products.map(x => x.productId);
                const newdata = await productModel.updateMany({ _id: { '$in': ids } }, { $inc: { productQty: -1 } });

            }
            res.status(200).json({ "message": "Successful" })
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

module.exports = {
    getTransactions,
    getTransaction,
    addTranscation,
    updateTranscation,
    deleteTranscation,
    updateTransctionstatus
}