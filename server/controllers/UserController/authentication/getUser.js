const sellerSchema = require("../../../models/sellerSchema");
const userScheme = require("../../../models/userScheme");
const ErrorHandler = require("../../../utiles/ErrorHandler");

const getUser = async (req, res, next) => {
  try {
    let data;
    
    console.log(req.role)
    if(req.role === 'user' || req.role === 'admin'){
      const user = await userScheme.findById(req.id);
      if (!user) return next(new ErrorHandler("User not found", 404));
      data=user
    }
    if(req.role === 'seller'){
      const seller = await sellerSchema.findById(req.id);
      if (!seller) return next(new ErrorHandler("Seller not found", 404));
      data=seller
    }
    res.status(200).json({
      success: true,
      message: 'User found',
      data:data
    });
  } catch (err) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
};
module.exports = {getUser}