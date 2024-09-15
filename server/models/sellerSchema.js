const mongoose = require('mongoose');

const slugify = require("slugify");
const { ErrorHandler } = require("../utiles");
const sellerSchema = new mongoose.Schema({
 name:{type:String, required:true},
 email:{type:String, required:true, unique:true},
 password:{
    required: [true, "Please enter your password"],
    minLength: [8, "Password should be greater than 7 characters"],},
 phone:{type:String, required:true},

 addresses:[
    { address_1:{type:String},
      street:{type:String },
      city:{type:String,}, 
      state:{type:String,}, 
      country:{type:String,},
      zip:{type:String,}, 
  
    }
  ],
  role:{
    type: String,
    default: "Seller",
  },
  avatar:{
    type:String
 },
 isActivated:{
  type:Boolean,
  default:false
 },
 store:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true,
 },
 createdAt:{
  type: Date,
  default: Date.now(),
 },
 resetPasswordToken: String,
 resetPasswordTime: Date,

});
//  Hash password
sellerSchema.pre("save", async function (next){
    if(!this.isModified("password")){
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  // jwt token
  sellerSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id, name: this.name}, process.env.JWT_SECRET_KEY);
  };
  //Account Activation jwt token
  sellerSchema.methods.createExpirableActivationToken = function () {
    return jwt.sign({ id: this._id, name: this.name}, process.env.JWT_SECRET_KEY, {expiresIn:"5m"});
  };
  //Account Activation jwt token verify
  sellerSchema.methods.verifyToken = function (token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  };
  
  // compare password
  sellerSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  

  module.exports = mongoose.model("Seller", sellerSchema);;
