const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema =  mongoose.Schema;

var schema = new Schema({
    productName: { type: String, required: true },
    productCode:{type: String},
    status: { type: Boolean, default: false},
    productBrand: { type: mongoose.Schema.Types.ObjectId },
    productCategory: { type: mongoose.Schema.Types.ObjectId },
    store:{type: mongoose.Schema.Types.ObjectId},
    season:{type: mongoose.Schema.Types.ObjectId},
    createdAt: { type: Date, required: true, default: Date.now },
    storeId: {type:String},
    thumbnil:{type: String},
    productPrice:{type: Number},
    productDescription: {type: String}
});
schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);

const products = mongoose.model('products', schema)

module.exports = products