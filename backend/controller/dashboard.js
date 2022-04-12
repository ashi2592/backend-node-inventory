const { topSellingProduct } = require("../query/products");
const transcationsModel = require('../models/transcation');
const productModel = require('../models/products')

const getTopSellingProduct = async (req,res,next) =>{
    
    try {
        const { storeId} = req.query;
        var existingdata = await transcationsModel.aggregate(topSellingProduct(storeId));
      
        res.status(200).json(existingdata.length > 0 ? existingdata[0] : {})
        // res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


module.exports = {
    getTopSellingProduct
}