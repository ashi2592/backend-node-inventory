const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
const Schema =  mongoose.Schema;


var schema = new Schema({
    userId: {type: Schema.Types.ObjectId},
    token: {type:String},
    status: { type: Boolean, default: false },
});
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('sessions', schema)
