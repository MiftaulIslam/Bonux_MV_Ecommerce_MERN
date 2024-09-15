const mongoose =require('mongoose');
const storeperformanceSchema = new mongoose.Schema({
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
    totalOrders: { type: Number, default: 0 },
    completedOrders: { type: Number, default: 0 },
    cancelledOrders: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('StorePerformance', vendorPerformanceSchema);