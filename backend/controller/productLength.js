const lengthModel = require('../models/productLength');
const util = require('../util/index');
const ValidationSchema = require('../validtors/index')

const getLengths = async (req, res, next) => {
    try {
        const { page, count = 10,storeId } = req.query;
        const paginationOption = util.paginateOptions(Number(page), count);
        const existingdata = await lengthModel.paginate({storeId}, paginationOption)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const getLength = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingdata = await lengthModel.findById(id)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const addLength = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.lengthSchema, reqBody);
        if (value) {
            let lengthModelObj = new lengthModel();
            lengthModelObj.lengthName = reqBody.lengthName;
            lengthModelObj.status = reqBody.status;
            lengthModelObj.storeId = reqBody.storeId;
            await lengthModelObj.save()
            res.status(200).json(lengthModelObj)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const updateLenght = async (req, res, next) => {

    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.lengthSchema, reqBody);
        if (value) {
            const { id } = req.params;
            const data = await lengthModel.findByIdAndUpdate(id, req.body)
            res.status(200).json(data)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

}

const deleteLength = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await lengthModel.findByIdAndDelete(id)
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
    getLengths,
    getLength,
    addLength,
    updateLenght,
    deleteLength
}