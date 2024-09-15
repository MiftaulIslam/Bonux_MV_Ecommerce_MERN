const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a product name"],
    },
    sku: {
        type: String
    },
    description: {
        type: String,
        required: [true, "Please enter a product description"],
    },
    specification: [
        { key: { type: String }, value: { type: String } }
    ],
    price: {
        original_price: { type: Number, required: [true, "Please enter product price"] },
        discount_percentage: { type: Number },
        discounted_amount: { type: Number },
    },
    stock: {
        quantity: { type: Number, required: [true, "Please enter product quantity"] },
        status: { type: String, enum: ["in stock", "out of stock"], default: "in stock" }
    },
    attributes: {
        color: { type: String },
        size: { type: String },
        weight: { type: String }
    },
    ratings: {
        average_rating: { type: Number, min: 0, max: 5 },
        reviews_count: { type: String, default: 0 }
    },
    status: { type: String, enum: ["available", "discontinued"], default: "available" },
    image: [{
        url: { type: String },
        alt_text: { type: String },
    }],
    delivery: {
        status: { type: String, enum: ["not received", "received"], default: "not received" },
        delivery_time: { type: String }, // in hours or days
        estimated_delivery_date: { type: Date },
    },
    sold_out: {
        type: String,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    category_slug: {
        type: String
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        index: true,
        required: [true, "Please select a store"],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        index: true,
        required: [true, "Please select a product category"],
    },
    warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warehouse', // Reference to the Warehouse model
        required: [true, "Please select a warehouse"],
    }
});

// Pre-save hook to generate SKU and amount
productSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('name') || this.isModified('attributes.size') || this.isModified('attributes.color')) {
        const namePart = this.name.substring(0, 3).toUpperCase();
        const sizePart = this.attributes.size ? this.attributes.size.toUpperCase().substring(0, 2) : 'XX';
        const colorPart = this.attributes.color ? this.attributes.color.toUpperCase().substring(0, 2) : 'XX';
        this.sku = `${namePart}-${sizePart}-${colorPart}-${Date.now()}`;
    }

    // Calculate discounted_amount based on original_price and discount_percentage
    if (this.price.original_price && this.price.discount_percentage !== undefined) {
        const discount = (this.price.discount_percentage / 100) * this.price.original_price;
        this.price.discounted_amount = this.price.original_price - discount;
    } else {
        this.price.discounted_amount = this.price.original_price; // No discount applied
    }

    next();
});

module.exports = mongoose.model("Product", productSchema);
