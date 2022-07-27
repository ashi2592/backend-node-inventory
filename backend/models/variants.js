const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema =  mongoose.Schema;

var schema = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId },
    productColor: { type: mongoose.Schema.Types.ObjectId },
    productType: { type: mongoose.Schema.Types.ObjectId },
    productSize: { type: mongoose.Schema.Types.ObjectId },
    productPattern: { type: mongoose.Schema.Types.ObjectId },
    productLength: { type: mongoose.Schema.Types.ObjectId },
    articleNo: {type:String},
    createdAt: { type: Date, required: true, default: Date.now },
    storeId: {type:String},
    status: { type: Boolean, default: false},
    isReduceAble: { type: Boolean, default: false },
});
schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);

const variants = mongoose.model('variants', schema)

module.exports = variants