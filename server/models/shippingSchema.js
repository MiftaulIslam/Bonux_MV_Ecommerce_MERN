const mongoose = require('mongoose');
const shippingSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    warehouse:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warehouse',
        required: true
    },
    trackingNumber: { type: String },
    status: { 
      type: String, 
      enum: ['pending', 'shipped', 'in-transit', 'delivered', 'returned'], 
      default: 'pending' 
    },
    estimatedDeliveryDate: { type: Date },
    deliveryDate: { type: Date},
    createdAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model('Shipping', shippingSchema)