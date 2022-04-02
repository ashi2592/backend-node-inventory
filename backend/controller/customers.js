const customerModel = require('../models/customers');
const util = require('../util/index');
const ValidationSchema = require('../validtors/index')

const getCustomers = async (req, res, next) => {
    try {
        const { page, count = 10 } = req.query;
        const paginationOption = util.paginateOptions(Number(page), count);
        const existingdata = await customerModel.paginate({}, paginationOption)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const getCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingdata = await customerModel.findById(id)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const addCustomer = async (req, res, next) => {
    try {
        const reqBody = req.body;
        console.log(req.body)
        const value = await util.ValidateData(ValidationSchema.customerSchema, reqBody);
        if (value) {
            let customerModelObj = new customerModel();
            customerModelObj.customerName = reqBody.customerName|| 'Guest User';
            customerModelObj.mobile = reqBody.mobile;
            customerModelObj.status = reqBody.status;
            await customerModelObj.save()
            res.status(200).json(customerModelObj)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const updateCustomer = async (req, res, next) => {

    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.customerSchema, reqBody);
        if (value) {
            const { id } = req.params;
            const data = await customerModel.findByIdAndUpdate(id, req.body)
            res.status(200).json(data)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

}

const deleteCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await customerModel.findByIdAndDelete(id)
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
    getCustomers,
    getCustomer,
    addCustomer,
    updateCustomer,
    deleteCustomer
}