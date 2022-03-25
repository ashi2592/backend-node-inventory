
const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
const Schema =  mongoose.Schema;

var schema = new Schema({
    customerName: { type: String },
    mobileNo: { type: String },
    status: { type: Boolean , default: true},
    createdAt: { type: Date, required: true, default: Date.now }
});
schema.plugin(mongoosePaginate);


const customers = mongoose.model('customers', schema)

module.exports = customers;