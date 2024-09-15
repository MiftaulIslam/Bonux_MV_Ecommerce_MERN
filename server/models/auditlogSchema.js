const mongoose = require('mongoose');
const auditlogSchema = new mongoose.Schema({
    action: { type: String, required: true },  // e.g., 'DELETE_PRODUCT', 'UPDATE_ORDER_STATUS'
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'admin', required: true },
  details: { type: String },  // Detailed description of the action
  timestamp: { type: Date, default: Date.now }
})