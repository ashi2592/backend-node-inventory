const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2');

const otherSchema =  new Schema({
    keyName: {type: String, required: true},
    value: {type:String,required: true},
    status:{type: Boolean, default: true}
})
otherSchema.plugin(mongoosePaginate)



module.exports = mongoose.model('others',otherSchema);