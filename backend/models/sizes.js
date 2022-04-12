const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
const Schema =  mongoose.Schema;

var schema = new Schema({
    sizeName: { type: String },
    status: { type: Boolean },
    createdAt: { type: Date, required: true, default: Date.now },
    storeId: {type:String},
});
schema.plugin(mongoosePaginate);

const sizes = mongoose.model('sizes', schema)

module.exports = sizes