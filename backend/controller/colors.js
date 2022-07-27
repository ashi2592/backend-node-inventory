const colorModel = require('../models/colors');
const util = require('../util/index');
const ValidationSchema = require('../validtors/index')

const getColors = async (req, res, next) => {
    try {
        const { page, count = 10, storeId } = req.query;
        const paginationOption = util.paginateOptions(Number(page), count);
        const existingdata = await colorModel.paginate({ storeId }, paginationOption)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const getColor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingdata = await colorModel.findById(id)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const addColor = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.colorSchema, reqBody);
        if (value) {
            let colorModelObj = new colorModel();
            colorModelObj.colorName = reqBody.colorName;
            colorModelObj.colorCode = reqBody.colorCode;
            colorModelObj.status = reqBody.status;
            colorModelObj.storeId = reqBody.storeId;
            await colorModelObj.save()
            res.status(200).json(colorModelObj)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const updateColor = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.colorSchema, reqBody);
        if (value) {
            const { id } = req.params;
            const data = await colorModel.findByIdAndUpdate(id, req.body)
            res.status(200).json(data)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

}

const deleteColor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await colorModel.findByIdAndDelete(id)
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
    getColors,
    getColor,
    addColor,
    updateColor,
    deleteColor
}