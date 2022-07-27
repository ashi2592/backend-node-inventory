const Joi = require('joi');
const commonValidator = require('./common')

const categorySchema = Joi.object({
    categoryName: commonValidator.TextSchemaWithRequired(),
    imageUrl: commonValidator.TextSchema(),
    status: commonValidator.booleanSchema(),
    taxPercent: commonValidator.TextSchema(),
    hascode: commonValidator.TextSchema(),
    parent: commonValidator.TextSchema(),
    storeId: commonValidator.TextSchemaWithRequired(),
})


const supplierSchema = Joi.object({
    supplierName: commonValidator.TextSchemaWithRequired(),
    contact: commonValidator.TextSchema(),
    address: commonValidator.TextSchema(),
    location: commonValidator.TextSchema(),
    status: commonValidator.booleanSchema(),
    storeId: commonValidator.TextSchemaWithRequired(),
})

const brandSchema = Joi.object({
    brandName: commonValidator.TextSchemaWithRequired(),
    imageUrl: commonValidator.TextSchema(),
    status: commonValidator.booleanSchema(),
    storeId: commonValidator.TextSchemaWithRequired(),
})

const colorSchema = Joi.object({
    colorName: commonValidator.TextSchemaWithRequired(),
    colorCode: commonValidator.TextSchema(),
    status: commonValidator.booleanSchema(),
    storeId: commonValidator.TextSchemaWithRequired(),
})


const typeSchema = Joi.object({
    typeName: commonValidator.TextSchemaWithRequired(),
    status: commonValidator.booleanSchema(),
    storeId: commonValidator.TextSchemaWithRequired(),
})

const patternSchema = Joi.object({
    patternName: commonValidator.TextSchemaWithRequired(),
    status: commonValidator.booleanSchema(),
    storeId: commonValidator.TextSchemaWithRequired(),
})


const lengthSchema = Joi.object({
    lengthName: commonValidator.TextSchemaWithRequired(),
    status: commonValidator.booleanSchema(),
    storeId: commonValidator.TextSchemaWithRequired(),
})


const sizeSchema = Joi.object({
    sizeName: Joi.string().min(2).max(3).required(),
    status: commonValidator.booleanSchema(),
    storeId: commonValidator.TextSchemaWithRequired(),
})


const productSchema = Joi.object({
    _id: commonValidator.TextSchema(),
    productName: commonValidator.TextSchemaWithRequired(),
    productBrand: commonValidator.TextSchemaWithRequired(),
    productCategory: commonValidator.TextSchemaWithRequired(),
    status: commonValidator.booleanSchema(),
    store: commonValidator.TextSchemaWithRequired(),
    season: commonValidator.TextSchemaWithRequired(),
    storeId: commonValidator.TextSchemaWithRequired(),
    thumbnil: commonValidator.TextSchema(),
    productPrice: commonValidator.NumberSchema().default(0),
    productDescription: commonValidator.TextSchema()
})


const customerSchema = Joi.object({
    customerName: commonValidator.TextSchema(),
    mobile: commonValidator.TextSchemaWithRequired(1, 3000),
    status: commonValidator.booleanSchema(),
    storeId: commonValidator.TextSchemaWithRequired(),
})


const otherSchema = Joi.object({
    keyName: commonValidator.TextSchema(),
    value: commonValidator.TextSchema(),
    status: commonValidator.booleanSchema(),
    storeId: commonValidator.TextSchemaWithRequired(),
})



const transcationSchema = Joi.object({
    _id: commonValidator.TextSchema(),
    orderId: commonValidator.TextSchema(),
    totalVal: commonValidator.NumberSchemaWithRequired(),
    totalQty: commonValidator.NumberSchemaWithRequired(),
    totalMrp: commonValidator.NumberSchemaWithRequired(),
    totalPrice: commonValidator.NumberSchemaWithRequired(),
    totalProfit: commonValidator.NumberSchema(),
    paidAmount: commonValidator.NumberSchema(),
    creditAmount: commonValidator.NumberSchema(),
    returnAmount: commonValidator.NumberSchema(),
    discount: commonValidator.NumberSchema(),
    storeId: commonValidator.TextSchemaWithRequired(),
    products: Joi.array().items(
        Joi.object({
            productId: commonValidator.TextSchemaWithRequired(),
            variantId: commonValidator.TextSchemaWithRequired(),
            purchaseId: commonValidator.TextSchemaWithRequired(),
            purchaseProductId: commonValidator.TextSchemaWithRequired(),
            sellPrice: commonValidator.NumberSchemaWithRequired(),
            singleItem: commonValidator.NumberSchemaWithRequired(),
            productQty: commonValidator.NumberSchemaWithRequired(),
            mrp: commonValidator.NumberSchema(),
            tax: commonValidator.NumberSchema(),
            productText: commonValidator.TextSchemaWithRequired(),
            variantText: commonValidator.TextSchemaWithRequired(),
            singleItem: commonValidator.NumberSchemaWithRequired(),
            barcode: commonValidator.TextSchema(),

        })
    ),
    customer: Joi.object({
        _id: commonValidator.TextSchemaWithRequired(),
        customerName: commonValidator.TextSchemaWithRequired(),
        mobile: commonValidator.TextSchemaWithRequired(),
    })
})



const transcationUpdateSchema = Joi.object({
    status: commonValidator.booleanSchema(),
    paidAmount: commonValidator.NumberSchema(),
    creditAmount: commonValidator.NumberSchema(),
    returnAmount: commonValidator.NumberSchema(),
    storeId: commonValidator.TextSchemaWithRequired(),
})


const barcodeSchema = Joi.object({
    productId: commonValidator.TextSchemaWithRequired(),
    variantId: commonValidator.TextSchemaWithRequired(),
    purchaseId: commonValidator.TextSchemaWithRequired(),
    purchaseProductId: commonValidator.TextSchemaWithRequired(),
    transcationId: commonValidator.TextSchema(),
    transactionProductId: commonValidator.TextSchema(),
    barcode: commonValidator.TextSchemaWithRequired(),
    qty: commonValidator.NumberSchemaWithRequired(),
    status: commonValidator.booleanSchema(),
    storeId: commonValidator.TextSchemaWithRequired(),
    isReduceAble: commonValidator.booleanSchema().default(false),
})


const userSchema = Joi.object({
    username: commonValidator.TextSchemaWithRequired(),
    password: commonValidator.TextSchemaWithRequired(),
    storeId: commonValidator.TextSchemaWithRequired(),
})



const returnProductSchema = Joi.object({
    productId: commonValidator.TextSchemaWithRequired(),
    storeId: commonValidator.TextSchemaWithRequired(),
    codes: commonValidator.TextSchemaWithRequired(),
    previousCode: commonValidator.TextSchemaWithRequired(),
})

// console.log(commonValidator.TextSchemaWithRequired());



const variantProducts = Joi.object({
    _id: commonValidator.TextSchema(),
    productId: commonValidator.TextSchemaWithRequired(),
    productColor: commonValidator.TextSchemaWithRequired(),
    productType: commonValidator.TextSchemaWithRequired(),
    productSize: commonValidator.TextSchemaWithRequired(),
    productLength: commonValidator.TextSchemaWithRequired(),
    productPattern: commonValidator.TextSchemaWithRequired(),
    articleNo: commonValidator.TextSchema(),
    storeId: commonValidator.TextSchemaWithRequired(),
    isReduceAble: commonValidator.booleanSchema()
})



const purchaseSchema = Joi.object({
    _id: commonValidator.TextSchema(),
    supplier: commonValidator.TextSchemaWithRequired(),
    supplierText: commonValidator.TextSchemaWithRequired(),
    storeId: commonValidator.TextSchemaWithRequired(),
    totalAmount: commonValidator.NumberSchemaWithRequired(),
    totalQty: commonValidator.NumberSchema(),
    taxAmount: commonValidator.NumberSchema(),
    delivery: commonValidator.NumberSchema(),
    products: Joi.array().items(
        Joi.object({
            productId: commonValidator.TextSchemaWithRequired(),
            variantId: commonValidator.TextSchemaWithRequired(),
            purchasePrice: commonValidator.NumberSchemaWithRequired(),
            taxAmount: commonValidator.NumberSchema(),
            deliveryCharge: commonValidator.NumberSchema(),
            sellPrice: commonValidator.NumberSchemaWithRequired(),
            qty: commonValidator.NumberSchemaWithRequired(),
            mrp: commonValidator.NumberSchema(),
            productText: commonValidator.TextSchemaWithRequired(),
            singleItem: commonValidator.NumberSchemaWithRequired(),
            tax: commonValidator.NumberSchemaWithRequired(),
            totalAmount: commonValidator.NumberSchemaWithRequired(),
            variantText: commonValidator.TextSchemaWithRequired(),
            articleNo: commonValidator.TextSchemaWithRequired(),
        })
    )
});

const UpdatePurchaseProductSchema = Joi.object({
    purchasePrice: commonValidator.NumberSchema(),
    taxAmount: commonValidator.NumberSchema(),
    deliveryCharge: commonValidator.NumberSchema(),
    salePrice: commonValidator.NumberSchemaWithRequired(),
    qty: commonValidator.NumberSchema(),
})



module.exports = {
    categorySchema,
    supplierSchema,
    brandSchema,
    colorSchema,
    typeSchema,
    sizeSchema,
    productSchema,
    customerSchema,
    otherSchema,
    transcationSchema,
    transcationUpdateSchema,
    barcodeSchema,
    userSchema,
    returnProductSchema,
    lengthSchema,
    variantProducts,
    patternSchema,
    purchaseSchema,
    UpdatePurchaseProductSchema
}

