const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
const Schema =  mongoose.Schema;


var schema = new Schema({
    barcode: { type: String },
    storeId: {type:String},
    category: { type: String, default:'product' },
    productId: { type: mongoose.Schema.Types.ObjectId },
    createdAt: { type: Date, required: true, default: Date.now },
    status: { type: Boolean },
});
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('barcodes', schema)
