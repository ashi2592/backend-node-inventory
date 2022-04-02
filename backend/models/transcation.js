const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;


var productSchema = ({
    productId: { type: mongoose.Schema.Types.ObjectId },
    productName: { type: String, required: true },
    productQty: { type: Number, default: 0, required: true },
    productPrice: { type: Number, default: 0, required: true },
    productMrp: { type: Number, default: 0 },
    productVal: { type: Number, default: 0, required: true },
    productCode: { type: String, required: true },
    productBrand: { type: mongoose.Schema.Types.ObjectId },
    productColor: { type: mongoose.Schema.Types.ObjectId },
    productCategory: { type: mongoose.Schema.Types.ObjectId },
    productSize: { type: mongoose.Schema.Types.ObjectId },
    productType:  { type: mongoose.Schema.Types.ObjectId },
})


var customerSchema = ({
    _id: { type: mongoose.Schema.Types.ObjectId },
        customerName: { type: String, required: true },
        mobile: { type: String, required: true },
})

var schema = new Schema({
    totalVal: { type: Number, default: 0, required: true },
    totalQty: { type: Number, default: 0, required: true },
    totalMrp: { type: Number, default: 0, required: true },
    totalPrice: { type: Number, default: 0, required: true },
    discount: { type: Number, default: 0, required: true },
    store: { type: mongoose.Schema.Types.ObjectId },
    season: { type: mongoose.Schema.Types.ObjectId },
    status: { type: Boolean, default: false },
    status: { type: Boolean, default: false },
    createdAt: { type: Date, required: true, default: Date.now },
    products: { type: [productSchema], },
    customer: {type: customerSchema} 
});
schema.plugin(mongoosePaginate);

const transcations = mongoose.model('transcations', schema)

module.exports = transcations;