const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['superadmin', 'admin', 'moderator'], required: true },
    permissions: [String],
    createdAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model('Admin', adminSchema)