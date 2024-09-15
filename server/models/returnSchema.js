const mongoose = require('mongoose');
const returnSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', },  // Store or Vendor ID
    reason: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['requested', 'approved', 'rejected', 'completed'], 
      default: 'requested' 
    },
    refundAmount: { type: Number },
    createdAt: { type: Date, default: Date.now },
})
module.exports = mongoose.model('Return', returnSchema)