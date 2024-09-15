const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, "Please enter your name!"],
  },
  email:{
    type: String,
    required: [true, "Please enter your email!"],
  },
  password:{
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should be greater than 4 characters"],
    
  },
  phoneNumber:{
    type: Number,

  },
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
    default: "user",
  },
  avatar:{
    type:String
 },
 isActivated:{
  type:Boolean,
  default:false
 },
 createdAt:{
  type: Date,
  default: Date.now(),
 },
 resetPasswordToken: String,
 resetPasswordTime: Date,
});


//  Hash password
userSchema.pre("save", async function (next){
  if(!this.isModified("password")){
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id, name: this.name}, process.env.JWT_SECRET_KEY);
};
//Account Activation jwt token
userSchema.methods.createExpirableActivationToken = function () {
  return jwt.sign({ id: this._id, name: this.name}, process.env.JWT_SECRET_KEY, {expiresIn:"5m"});
};
//Account Activation jwt token verify
userSchema.methods.verifyToken = function (token) {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);