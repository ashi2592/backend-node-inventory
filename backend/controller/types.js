const typeModel = require('../models/types');
const util = require('../util/index');
const ValidationSchema = require('../validtors/index')

const getTypes = async (req, res, next) => {
    try {
        const { page, count = 10 } = req.query;
        const paginationOption = util.paginateOptions(Number(page), count);
        const existingdata = await typeModel.paginate({}, paginationOption)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const getType = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingdata = await typeModel.findById(id)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const addType = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.typeSchema, reqBody);
        if (value) {
            let typeModelObj = new typeModel();
            typeModelObj.typeName = reqBody.typeName;
            typeModelObj.status = reqBody.status;
            await typeModelObj.save()
            res.status(200).json(typeModelObj)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const updateType = async (req, res, next) => {

    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.typeSchema, reqBody);
        if (value) {
            const { id } = req.params;
            const data = await typeModel.findByIdAndUpdate(id, req.body)
            res.status(200).json(data)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

}

const deleteType = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await typeModel.findByIdAndDelete(id)
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
    getTypes,
    getType,
    addType,
    updateType,
    deleteType
}