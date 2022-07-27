const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

var schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    storeId: { type: String, required: true },
    store: { type: String },
    season: { type: String},
    address: { type: String},
    mobile: { type: String},
    logo: { type: String},
    status: { type: Boolean, required: true },
    createdAt: { type: Date, required: true, default: Date.now }
    
});
schema.plugin(mongoosePaginate);

const types = mongoose.model('users', schema)

module.exports = types;