const sizeModel = require('../models/sizes');
const util = require('../util/index');
const ValidationSchema = require('../validtors/index')

const getSizes = async (req, res, next) => {
    try {
        const { page, count = 10,storeId } = req.query;
        const paginationOption = util.paginateOptions(Number(page), count);
        const existingdata = await sizeModel.paginate({storeId}, paginationOption)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const getSize = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingdata = await sizeModel.findById(id)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const addSize = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.sizeSchema, reqBody);
        if (value) {
            let sizeModelObj = new sizeModel();
            sizeModelObj.sizeName = reqBody.sizeName;
            sizeModelObj.status = reqBody.status;
            sizeModelObj.storeId = reqBody.storeId;

            
            await sizeModelObj.save()
            res.status(200).json(sizeModelObj)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const updateSize = async (req, res, next) => {

    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.sizeSchema, reqBody);
        if (value) {
            const { id } = req.params;
            const data = await sizeModel.findByIdAndUpdate(id, req.body)
            res.status(200).json(data)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

}

const deleteSize = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await sizeModel.findByIdAndDelete(id)
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
    getSizes,
    getSize,
    addSize,
    updateSize,
    deleteSize
}