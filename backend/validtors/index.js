const Joi = require('joi');
const commonValidator = require('./common')

const categorySchema = Joi.object({
    categoryName: commonValidator.TextSchemaWithRequired(),
    status: commonValidator.booleanSchema()
})


const supplierSchema = Joi.object({
    supplierName: commonValidator.TextSchemaWithRequired(),
    status: commonValidator.booleanSchema()
})

const brandSchema = Joi.object({
    brandName: commonValidator.TextSchemaWithRequired(),
    status: commonValidator.booleanSchema()
})

const colorSchema = Joi.object({
    colorName: commonValidator.TextSchemaWithRequired(),
    status: commonValidator.booleanSchema()
})


const typeSchema = Joi.object({
    typeName: commonValidator.TextSchemaWithRequired(),
    status: commonValidator.booleanSchema()
})


const sizeSchema = Joi.object({
    sizeName: commonValidator.TextSchemaWithRequired(),
    status: commonValidator.booleanSchema()
})


const productSchema = Joi.object({
    productName: commonValidator.TextSchemaWithRequired(),
    productCategory: commonValidator.TextSchemaWithRequired(),
    status: commonValidator.booleanSchema(),
    productBrand: commonValidator.TextSchemaWithRequired(),
    productColor: commonValidator.TextSchemaWithRequired(),
    productQty:  commonValidator.NumberSchema(),
    productSupplier: commonValidator.TextSchemaWithRequired(),
    productType: commonValidator.TextSchema(),
    productSize: commonValidator.TextSchemaWithRequired(),
    productPrice: commonValidator.NumberSchema(),
    productMrp:  commonValidator.NumberSchema(),
    store: commonValidator.TextSchemaWithRequired(),
    season: commonValidator.TextSchemaWithRequired(),
})


const customerSchema = Joi.object({
    customerName: commonValidator.TextSchema(),
    mobileNo: commonValidator.NumberSchemaWithRequired(),
    status: commonValidator.booleanSchema()
})


const otherSchema = Joi.object({
    keyName: commonValidator.TextSchema(),
    value: commonValidator.TextSchema(),
    status: commonValidator.booleanSchema()
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
    otherSchema
}

