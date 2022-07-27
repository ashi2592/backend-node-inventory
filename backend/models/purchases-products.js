const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;

const purchaseproductSchema = new Schema({
    productId: { type: Schema.Types.ObjectId },
    variantId: { type: Schema.Types.ObjectId },
    articleNo: {  type: String },
    purchaseId: { type: Schema.Types.ObjectId },
    purchasePrice: { type: Number },
    sellPrice: { type: Number },
    taxAmount: { type: Number },
    mrp: { type: Number },
    deliveryCharge: { type: Number },
    qty: { type: Number },
    priceType: { type: String, default: 'flat' },
    purchaseStatus: { type: String, default: 'new' },
    createdAt: { type: Date, required: true, default: Date.now },
    productText: { type: String },
    singleItem: { type: Number },
    tax: { type: Number },
    totalAmount: { type: Number },
    variantText: { type: String },

})

purchaseproductSchema.plugin(mongoosePaginate);
purchaseproductSchema.plugin(aggregatePaginate);

const purchasesProducts = mongoose.model('purchaseProducts', purchaseproductSchema)

module.exports = purchasesProducts;