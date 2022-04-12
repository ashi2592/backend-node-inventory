const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
const Schema =  mongoose.Schema;

var schema = new Schema({
    typeName: { type: String },
    status: { type: Boolean },
    createdAt: { type: Date, required: true, default: Date.now },
    storeId: {type:String},
});
schema.plugin(mongoosePaginate);

const types = mongoose.model('types', schema)

module.exports = types;