const Joi = require('joi');
const commonValidator = require('./common')

const categorySchema = Joi.object({
    categoryName: commonValidator.TextSchemaWithRequired(),
    status: commonValidator.booleanSchema(),
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
    status: commonValidator.booleanSchema(),
    storeId: commonValidator.TextSchemaWithRequired(),
})

const colorSchema = Joi.object({
    colorName: commonValidator.TextSchemaWithRequired(),
    status: commonValidator.booleanSchema(),
    storeId: commonValidator.TextSchemaWithRequired(),
})


const typeSchema = Joi.object({
    typeName: commonValidator.TextSchemaWithRequired(),
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
    productCode: commonValidator.TextSchemaWithRequired(),
    productCategory: commonValidator.TextSchemaWithRequired(),
    status: commonValidator.booleanSchema(),
    productBrand: commonValidator.TextSchemaWithRequired(),
    productColor: commonValidator.TextSchemaWithRequired(),
    productQty: commonValidator.NumberSchema(),
    productSupplier: commonValidator.TextSchemaWithRequired(),
    productType: commonValidator.TextSchema(),
    productSize: commonValidator.TextSchemaWithRequired(),
    productPrice: commonValidator.NumberSchema(),
    productMrp: commonValidator.NumberSchema(),
    store: commonValidator.TextSchemaWithRequired(),
    season: commonValidator.TextSchemaWithRequired(),
    barcodes: Joi.array().items(Joi.string()),
    storeId: commonValidator.TextSchemaWithRequired(),
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
    totalVal: commonValidator.NumberSchemaWithRequired(),
    totalQty: commonValidator.NumberSchemaWithRequired(),
    totalMrp: commonValidator.NumberSchemaWithRequired(),
    totalPrice: commonValidator.NumberSchemaWithRequired(),
    discount: commonValidator.NumberSchema(),
    store: commonValidator.TextSchemaWithRequired(),
    season: commonValidator.TextSchemaWithRequired(),
    storeId: commonValidator.TextSchemaWithRequired(),
    products: Joi.array().items(
        Joi.object({
            productId: commonValidator.TextSchema(),
            productName: commonValidator.TextSchema(),
            productCode: commonValidator.TextSchemaWithRequired(),
            productQty: commonValidator.NumberSchemaWithRequired(),
            productPrice: commonValidator.NumberSchemaWithRequired(),
            productMrp: commonValidator.NumberSchema(),
            productVal: commonValidator.NumberSchemaWithRequired(),
            productBrand: commonValidator.TextSchemaWithRequired(),
            productCategory: commonValidator.TextSchemaWithRequired(),
            productColor: commonValidator.TextSchemaWithRequired(),
            productSize: commonValidator.TextSchemaWithRequired(),
            productType: commonValidator.TextSchema(),


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
    storeId: commonValidator.TextSchemaWithRequired(),
})


const barcodeSchema = Joi.object({
    productId: commonValidator.TextSchemaWithRequired(),
    barcode: commonValidator.TextSchemaWithRequired(),
    status: commonValidator.booleanSchema(),
    storeId: commonValidator.TextSchemaWithRequired(),
})


const userSchema = Joi.object({
    username: commonValidator.TextSchemaWithRequired(),
    password: commonValidator.TextSchemaWithRequired(),
    storeId: commonValidator.TextSchemaWithRequired(),
})


// console.log(commonValidator.TextSchemaWithRequired());

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
    userSchema
}

