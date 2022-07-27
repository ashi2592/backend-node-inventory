const { topSellingProduct, dayWiseSells, categoryWiseCount, monthWiseSale } = require("../query/products");
const transcationsModel = require('../models/transcation');
const productModel = require('../models/products')

const getTopSellingProduct = async (req,res,next) =>{
    
    try {
        const { storeId} = req.query;
        var existingdata = await transcationsModel.aggregate(topSellingProduct(storeId));
      
        res.status(200).json(existingdata)
        // res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const getDayWiseTranscation = async (req,res,next) =>{
    
    try {
        const { storeId} = req.query;
        var existingdata = await transcationsModel.aggregate(dayWiseSells(storeId));
      
        res.status(200).json(existingdata)
        // res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const getMonthWiseTranscation = async (req,res,next) =>{
    
    try {
        const { storeId} = req.query;
        var existingdata = await transcationsModel.aggregate(monthWiseSale(storeId));
      
        res.status(200).json(existingdata)
        // res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const getCategoryWiseCount = async (req,res,next) =>{
    
    try {
        const { storeId} = req.query;
        var existingdata = await productModel.aggregate(categoryWiseCount(storeId));
      
        res.status(200).json(existingdata)
        // res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    getTopSellingProduct,
    getDayWiseTranscation,
    getCategoryWiseCount,
    getMonthWiseTranscation
}