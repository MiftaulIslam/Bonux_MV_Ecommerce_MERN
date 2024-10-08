const mongoose =require('mongoose');
const sellerSchema = require('./sellerSchema');

const storeSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    
 name:{type:String, required:true},
 description:{type:String, required:true},
 media:{
    logo:{type:String},
    banner:{type:String}
 },
 address:{
    address:{type:String},
    region:{type:String },
    city:{type:String,}, 
    zone:{type:String,}, 
 },
 opening_hours:{type:String, required:true},
 closing_hours:{type:String, required:true},
 shop_status:{type:String, enum:["active","closed"], default:'active'},
 ratings:{
    average_rating:{type:Number, min:0, max:5},
    reviews_count:{type:String, default:0}
},
 created_at:{type:Date, default: Date.now},
 products:[{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
 orders:[{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
})

storeSchema.post('save', async function (store) {
   await sellerSchema.findByIdAndUpdate(store.seller, { store: store._id });
 });
module.exports = mongoose.model('Store', storeSchema)