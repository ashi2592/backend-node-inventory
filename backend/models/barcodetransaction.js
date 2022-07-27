const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

let barcodetranscations = new Schema({
    barcodeId: { type: mongoose.Schema.Types.ObjectId },
    type: { type: String, default: 'purchase' },
    barcode: { type: String },
    qty: { type: Number },
    purchaseId: { type: mongoose.Schema.Types.ObjectId },
    purchaseProductId: { type: mongoose.Schema.Types.ObjectId },
    transcationId: { type: mongoose.Schema.Types.ObjectId },
    transactionProductId: { type: mongoose.Schema.Types.ObjectId },
    createdAt: { type: Date, required: true, default: Date.now },
    storeId: {type:String},
})

barcodetranscations.plugin(mongoosePaginate);
barcodetranscations.plugin(aggregatePaginate);


module.exports = mongoose.model('barcodestranscations', barcodetranscations)