const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
const Schema =  mongoose.Schema;


var schema = new Schema({
    categoryName: { type: String },
    status: { type: Boolean },
    storeId: {type:String},
    createdAt: { type: Date, required: true, default: Date.now }
});
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('categories', schema)
