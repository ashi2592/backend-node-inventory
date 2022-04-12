const brandModel = require('../models/brands');
const util = require('../util/index');
const ValidationSchema = require('../validtors/index')

const getBrands = async (req, res, next) => {
    try {
        const { page, count = 10,storeId } = req.query;
        const paginationOption = util.paginateOptions(Number(page), count);
        const existingdata = await brandModel.paginate({storeId}, paginationOption)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const getBrand = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingdata = await brandModel.findById(id)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const addBrand = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.brandSchema, reqBody);
        if (value) {
            let brandModelObj = new brandModel();
            brandModelObj.brandName = reqBody.brandName;
            brandModelObj.status = reqBody.status;
            brandModelObj.storeId = reqBody.storeId;
            await brandModelObj.save()
            res.status(200).json(brandModelObj)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const updateBrand = async (req, res, next) => {

    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.brandSchema, reqBody);
        if (value) {
            const { id } = req.params;
            const data = await brandModel.findByIdAndUpdate(id, req.body)
            res.status(200).json(data)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

}

const deleteBrand = async (req, res, next) => {
    try {
        const { id,storeId } = req.params;
        const data = await brandModel.findOneAndRemove({id,storeId})
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
    getBrands,
    getBrand,
    addBrand,
    updateBrand,
    deleteBrand
}