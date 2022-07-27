const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
const Schema =  mongoose.Schema;

var schema = new Schema({
    lengthName: { type: String },
    status: { type: Boolean },
    createdAt: { type: Date, required: true, default: Date.now },
    storeId: {type:String},
});
schema.plugin(mongoosePaginate);

const productLength = mongoose.model('productLengths', schema)

module.exports = productLength;