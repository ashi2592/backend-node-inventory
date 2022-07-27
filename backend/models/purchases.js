const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;

var schema = new Schema({
    supplier: { type: mongoose.Schema.Types.ObjectId },
    supplierText:{ type: String },
    totalAmount: { type: Number, default: 0, required: true },
    totalQty: { type: Number, default: 0, required: true },
    taxAmount: { type: Number, default: 0 },
    delivery: { type: Number, default: 0 },
    storeId: { type: String },
    status: { type: Boolean, default: false },
    isCancel: { type: Boolean, default: false },
    createdAt: { type: Date, required: true, default: Date.now },
});

schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);

const transcations = mongoose.model('purchases', schema)

module.exports = transcations;