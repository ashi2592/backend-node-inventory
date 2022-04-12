const productModel = require('../models/products');
const { ProductAggreateQuery, barcodeSearchQuery } = require('../query/products');
const util = require('../util/index');
const ValidationSchema = require('../validtors/index');

const getProducts = async (req, res, next) => {
    try {
        const { page, count = 10,storeId } = req.query;
        const paginationOption = util.paginateOptions(Number(page), count);

        var myAggregate = productModel.aggregate(ProductAggreateQuery(storeId));
        // const existingdata = await productModel.paginate({}, paginationOption)
        const existingdata = await productModel.aggregatePaginate(myAggregate, paginationOption)

        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const searchProduct = async (req, res, next) => {
    try {
        const { searchText } = req.query;
        const existingdata = await productModel.find({ "$or": [{ productCode: { '$regex': searchText } }, { productName: { '$regex': searchText } }] }).limit(10)
        res.status(200).json(existingdata)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const getProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const myQuery = [...ProductAggreateQuery, ...[{ '$match': { _id: util.getObjectId(id) } }]];
        const existingdata = await productModel.aggregate(myQuery)
        res.status(200).json(existingdata.length > 0 ? existingdata[0] : {})
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const getProductBybarcode = async (req, res, next) => {
    try {
        const { id } = req.params;
        const myQuery = barcodeSearchQuery(id)
        const existingdata = await productModel.aggregate(myQuery)
        res.status(200).json(existingdata.length > 0 ? existingdata[0] : {})
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const addProduct = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.productSchema, req.body);
        if (value) {
            let productModelObj = new productModel(req.body);
            await productModelObj.save()
            res.status(200).json(productModelObj)
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const updateProduct = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const value = await util.ValidateData(ValidationSchema.productSchema, reqBody);
        if (value) {
            const { id } = req.params;
            const data = await productModel.findByIdAndUpdate(id, req.body)
            const myQuery = [...[{ '$match': { _id: util.getObjectId(id) } }], ...ProductAggreateQuery];
            const existingdata = await productModel.aggregate(myQuery)
            res.status(200).json(existingdata.length > 0 ? existingdata[0] : {})
        }

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

}


const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await productModel.findByIdAndDelete(id)
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


const getProductAvailiabity = async (req, res, next) => {
    try {
        const { ids } = req.query;
        const productIds = ids.split(',');
        const productsInfo = await productModel.find(
            { _id: { '$in': productIds } },
            { productQty: 1, _id: 1 },
        );
        res.status(200).json({ availability: productsInfo })


    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProduct,
    getProductAvailiabity,
    getProductBybarcode
}