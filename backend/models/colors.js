
const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
const Schema =  mongoose.Schema;

var schema = new Schema({
    colorName: { type: String },
    status: { type: Boolean },
    createdAt: { type: Date, required: true, default: Date.now }
});
schema.plugin(mongoosePaginate);


const colors = mongoose.model('colors', schema)

module.exports = colors;