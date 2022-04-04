const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
const Schema =  mongoose.Schema;

var schema = new Schema({
    supplierName: { type: String },
    status: { type: Boolean },
    contact: {type: String},
    addresss: {type: String},
    location: {type: String},
    createdAt: { type: Date, required: true, default: Date.now }
});
schema.plugin(mongoosePaginate);

const suppliers = mongoose.model('suppliers', schema)

module.exports = suppliers