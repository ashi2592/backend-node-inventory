const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
const Schema =  mongoose.Schema;
var schema = new Schema({
    barcode: { type: String },
    qty: {type: Number, default:0},
    storeId: {type:String},
    productId: { type: mongoose.Schema.Types.ObjectId },
    variantId: { type: mongoose.Schema.Types.ObjectId },
    status: { type: Boolean, default: true },
    isReduceAble: { type: Boolean, default: false },
    storeId: {type:String},
    createdAt: { type: Date, required: true, default: Date.now },
});
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('barcodes', schema)
