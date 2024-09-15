const mongoose  = require('mongoose');
const orderSchema = new mongoose.Schema({
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true,
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        quantity: {type:Number, required:true},
        price:{type:Number, required:true}
    }],
    total_amount:{
        type:Number,
        required: true,
    },
    status:{
        type:String,
        enum:['pending', 'processing', 'confirmed','shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    shipping_address:{
        street:{type:String, required:[true, 'Shipment needs a street address']},
        city:{type:String,required:[true, 'Shipment needs a city']}, 
        state:{type:String,required:[true, 'Shipment needs a state']}, 
        country:{type:String,required:[true, 'Shipment needs a country']},
        zip:{type:String,required:[true, 'Shipment needs a zip code']}, 
    },
    created_at:{
        type: Date,
        default: Date.now,
    },
    update_at:{
        type: Date,
        default: Date.now,
    }
})
module.exports = mongoose.model('Order', orderSchema)