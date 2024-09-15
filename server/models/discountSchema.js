const mongoose = require('mongoose');
const discountSchema = new mongoose.Schema({
    code: { type: String, unique: true, required: true },
    discount_Percentage: { type: Number, required: true },
    valid_From: { type: Date, required: true },
    valid_Until: { type: Date, required: true },
    applicable_Products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    usage_Limit: { type: Number, default: 1 },  // How many times it can be used per customer
    times_Used: { type: Number, default: 0 },
    created_At: { type: Date, default: Date.now }
})
module.exports = mongoose.model('Discount', discountSchema)