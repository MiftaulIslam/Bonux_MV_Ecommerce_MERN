const mongoose = require('mongoose');
const warehouseSchema = new mongoose.Schema({
    name: { type: String, required: true },
  address: {
    street: {type:String},
    city: {type:String},
    state: {type:String},
    country: {type:String},
    zip: {type:String},
  },
  stock: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number}
  }],
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Warehouse', warehouseSchema);