const mongoose = require('mongoose');
const inventorySchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    quantity: { type: Number, required: true },
    lastUpdated: { type: Date, default: Date.now } 
})
module.exports = mongoose.model('Inventory', inventorySchema);