
const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

var schema = new Schema({
    customerName: { type: String, default:'Guest User', require: true },
    mobile: { type: String, required: true },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, required: true, default: Date.now }
});
schema.plugin(mongoosePaginate);


const customers = mongoose.model('customers', schema)

module.exports = customers;