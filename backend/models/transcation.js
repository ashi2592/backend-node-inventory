const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

var productSchema = ({
    productId: { type: mongoose.Schema.Types.ObjectId },
    variantId: { type: mongoose.Schema.Types.ObjectId },
    purchaseId: { type: mongoose.Schema.Types.ObjectId },
    purchaseProductId: { type: mongoose.Schema.Types.ObjectId },
    productText: { type: String, required: true },
    variantText: { type: String, required: true },
    productQty: { type: Number, default: 0, required: true },
    sellPrice: { type: Number, default: 0, required: true },
    mrp: { type: Number, default: 0 },
    tax: { type: Number, default: 0, required: true },
    singleItem: { type: Number, default: 0, required: true },
    barcode: { type: String },
    saleStatus: { type: String, default: "new" }  

})


var customerSchema = ({
    _id: { type: mongoose.Schema.Types.ObjectId },
    customerName: { type: String, required: true },
    mobile: { type: String, required: true },
})

var schema = new Schema({
    orderId: { type: String, required: true },
    totalVal: { type: Number, default: 0, required: true },
    totalQty: { type: Number, default: 0, required: true },
    totalMrp: { type: Number, default: 0, required: true },
    totalPrice: { type: Number, default: 0, required: true },
    totalProfit: { type: Number, default: 0, required: true },
    discount: { type: Number, default: 0, required: true },
    store: { type: mongoose.Schema.Types.ObjectId },
    season: { type: mongoose.Schema.Types.ObjectId },
    status: { type: Boolean, default: false },
    status: { type: Boolean, default: false },
    createdAt: { type: Date, required: true, default: Date.now },
    products: { type: [productSchema], },
    customer: { type: customerSchema },
    storeId: { type: String },
    orderType: { type: String, default: 'sale' },
    isExchangeApplied: { type: Boolean, default: false },
    isRefundApplied: { type: Boolean, default: false },
    refundStatus: { type: String },
    pendingAmount: { type: Number, default: 0 },
    refundAmount: { type: Number, default: 0 },
    paidAmount: { type: Number, default: 0 },
    creditAmount: { type: Number, default: 0 },
    returnAmount: { type: Number, default: 0 },

});
schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);

const transcations = mongoose.model('transcations', schema)

module.exports = transcations;