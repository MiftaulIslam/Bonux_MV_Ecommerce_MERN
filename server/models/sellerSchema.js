const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Ensure bcrypt is imported
const jwt = require('jsonwebtoken'); // Ensure jwt is imported
const slugify = require("slugify");
const { ErrorHandler } = require("../utiles");

const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String, // Added type for password
    required: [true, "Please enter your password"],
    minLength: [8, "Password should be greater than 7 characters"],
  },
  phone: { type: String, required: true, RegExp:'/^(?:\+?88)?01[13-9]\d{8}$/gm' },
  role: {
    type: String,
    default: "seller",
  },
  avatar: {
    type: String,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

// Hash password before saving
sellerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// JWT token generation
sellerSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id, name: this.name, role:this.role }, process.env.JWT_SECRET_KEY);
};

// Account Activation token with expiration
sellerSchema.methods.createExpirableActivationToken = function () {
  return jwt.sign(
    { id: this._id, name: this.name, role: this.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "5m" }
  );
};

// Token verification
sellerSchema.methods.verifyToken = function (token) {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

// Compare password
sellerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Seller", sellerSchema);
