const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

var schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    storeId: { type: String, required: true },
    status: { type: Boolean, required: true },
    createdAt: { type: Date, required: true, default: Date.now }
});
schema.plugin(mongoosePaginate);

const types = mongoose.model('users', schema)

module.exports = types;