const patternModel = require('../models/patterns');
const util = require('../util/index');
const ValidationSchema = require('../validtors/index')

const getPatterns = async (req, res, next) => {
    try {
        const { page, count = 10,storeId } = req.query;
        const paginationOption = util.paginateOptions(Number(page), count);
        const existingdata = await patternModel.paginate({storeId}, paginationOption)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const getPattern = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingdata = await patternModel.findById(id)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const addPattern = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.patternSchema, reqBody);
        if (value) {
            let patternModelObj = new patternModel(reqBody);
            patternModelObj.storeId =reqBody.storeId;
            await patternModelObj.save()
            res.status(200).json(patternModelObj)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const updatePattern = async (req, res, next) => {

    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.patternSchema, reqBody);
        if (value) {
            const { id } = req.params;
            const data = await patternModel.findByIdAndUpdate(id, req.body)
            res.status(200).json(data)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

}

const deletePattern = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await patternModel.findByIdAndDelete(id)
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
    getPatterns,
    getPattern,
    addPattern,
    updatePattern,
    deletePattern
}