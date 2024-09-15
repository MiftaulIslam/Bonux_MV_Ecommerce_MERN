const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    customer:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    items:[{
        product:{type:mongoose.Schema.Types.ObjectId, ref:"Product", required:true},
        quantity:{type:Number, required:true},
        price:{type:Number, required:true},
    }],
    total_amount:{type:Number, required:true},
    updated_at:{type:Date, default:Date.now,required:true},
})

module.exports = mongoose.model('Cart', cartSchema);