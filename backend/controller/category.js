const CategoryModel = require('../models/category');
const util = require('../util/index');
const ValidationSchema = require('../validtors/index')

const getCategories = async (req, res, next) => {
    try {
        
        const { page, count = 10,searchText='',storeId } = req.query;
        const paginationOption = util.paginateOptions(Number(page), count);
        let query = {storeId};

        if(searchText){
            query = {categoryName: {'$regex': searchText}}
        }
        const existingdata = await CategoryModel.paginate(query, paginationOption)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const getCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingdata = await CategoryModel.findById(id)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const addCategory = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.categorySchema, reqBody);
        console.log(value)
        if (value) {

            let categoriesModelObj = new CategoryModel(reqBody);
                     await categoriesModelObj.save()
            res.status(200).json(categoriesModelObj)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const updateCategory = async (req, res, next) => {

    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.categorySchema, reqBody);
        if (value) {
            const { id } = req.params;
            const data = await CategoryModel.findByIdAndUpdate(id, req.body)
            res.status(200).json(data)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

}

const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await CategoryModel.findByIdAndDelete(id)
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
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory
}