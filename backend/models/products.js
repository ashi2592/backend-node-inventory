const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
const Schema =  mongoose.Schema;

var schema = new Schema({
    productName: { type: String, required: true },
    productCode:{type: String, required: true},
    status: { type: Boolean, default: false},
    productBrand: { type: mongoose.Schema.Types.ObjectId },
    productColor: { type: mongoose.Schema.Types.ObjectId },
    productCategory: { type: mongoose.Schema.Types.ObjectId },
    productQty: { type: Number , default:0},
    productSupplier: { type: mongoose.Schema.Types.ObjectId },
    productType: { type: mongoose.Schema.Types.ObjectId },
    productSize: { type: mongoose.Schema.Types.ObjectId },
    productPrice: {type: Number, required: true, default:0},
    productMrp: {type: Number, default: 0},
    store:{type: mongoose.Schema.Types.ObjectId},
    season:{type: mongoose.Schema.Types.ObjectId},
    createdAt: { type: Date, required: true, default: Date.now }

});
schema.plugin(mongoosePaginate);

const products = mongoose.model('products', schema)

module.exports = products