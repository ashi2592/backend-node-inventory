const otherSchema = require('../models/others');
const util = require('../util/index');
const ValidationSchema = require('../validtors/index')

const getOthers = async (req, res, next) => {
    try {
        const { page, count = 10 } = req.query;
        const paginationOption = util.paginateOptions(Number(page), count);
        const existingdata = await otherSchema.paginate({}, paginationOption)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const getOther = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingdata = await otherSchema.findById(id)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const addOther = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.otherSchema, reqBody);
        if (value) {
            let staticsObj = new otherSchema();
            staticsObj.keyName = reqBody.keyName;
            staticsObj.value = reqBody.value;
            staticsObj.status = reqBody.status;
            await staticsObj.save()
            res.status(200).json(staticsObj)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const updateOther = async (req, res, next) => {

    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.otherSchema, reqBody);
        if (value) {
            const { id } = req.params;
            const data = await otherSchema.findByIdAndUpdate(id, req.body)
            res.status(200).json(data)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

}

const deleteOthes = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await otherSchema.findByIdAndDelete(id)
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
    getOthers,
    getOther,
    addOther,
    updateOther,
    deleteOthes
}