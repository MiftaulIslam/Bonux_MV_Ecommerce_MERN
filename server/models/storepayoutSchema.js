const mongoose = require('mongoose');

const payoutSchema = new mongoose.Schema({
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'processed'], default: 'pending' },
  paymentMethod: { type: String, required: true },  // e.g., 'bank_transfer', 'paypal'
  transactionId: { type: String, required: true }, // e.g., ' },
  processedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payout', payoutSchema);
