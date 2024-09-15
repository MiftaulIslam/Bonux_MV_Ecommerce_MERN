const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
    order:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    payment_status:{
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    payment_method:{
        type: String,
        required: true
    },
    payment_date:{
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Payment', paymentSchema)