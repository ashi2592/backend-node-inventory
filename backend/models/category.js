const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema =  mongoose.Schema;


var schema = new Schema({
    categoryName: { type: String },
    imageUrl: { type: String },
    parent: {type: String},
    taxPercent: {type: String},
    hascode: {type: String},
    status: { type: Boolean },
    storeId: {type:String},
    createdAt: { type: Date, required: true, default: Date.now }
});
schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);

module.exports = mongoose.model('categories', schema)
