const supplierModel = require('../models/suppliers');
const util = require('../util/index');
const ValidationSchema = require('../validtors/index')

const getSuppliers = async (req, res, next) => {
    try {
        const { page, count = 10 } = req.query;
        const paginationOption = util.paginateOptions(Number(page), count);
        const existingdata = await supplierModel.paginate({}, paginationOption)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const getSupplier = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingdata = await supplierModel.findById(id)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const addSupplier = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.supplierSchema, reqBody);
        if (value) {
            let supplierModelObj = new supplierModel();
            supplierModelObj.supplierName = reqBody.supplierName;
            supplierModelObj.status = reqBody.status;
            await supplierModelObj.save()
            res.status(200).json(supplierModelObj)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const updateSupplier = async (req, res, next) => {

    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.supplierSchema, reqBody);
        if (value) {
            const { id } = req.params;
            const data = await supplierModel.findByIdAndUpdate(id, req.body)
            res.status(200).json(data)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

}

const deleteSupplier = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await supplierModel.findByIdAndDelete(id)
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
    getSuppliers,
    getSupplier,
    addSupplier,
    updateSupplier,
    deleteSupplier
}