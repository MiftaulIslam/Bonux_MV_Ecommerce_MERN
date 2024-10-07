const express = require("express");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { ErrorHandler, upload } = require("../utiles");
const sellerSchema = require("../models/sellerSchema");

const { sendEmail } = require('../utiles/MailSender');
const router = express.Router();
// Get all sellers
router.get(
  "/get-sellers",
    catchAsyncErrors(async(req, res, next)=>{
        try {
            const sellers = await sellerSchema.find()
            res.status(200).json({
                success: true,
                data: sellers
            })
        } catch (error) {
            next(new ErrorHandler('Internal Server Error', 500))
        }
        
    })
);
// Get all sellers
router.get(
  "/get-seller/:id",
    catchAsyncErrors(async(req, res, next)=>{
        try {
            const {id} = req.params
            const seller = await sellerSchema.findById(id)
            if(!seller) next(new ErrorHandler('Seller not found', 404))
            
            res.status(200).json({
                success: true,
                data: seller
            })
        } catch (error) {
            next(new ErrorHandler('Internal Server Error', 500))
        }
        
    })
);

// ------------Authentication Seller-----------

// Get all sellers
router.post(
  "/seller-login", upload.none(),
    catchAsyncErrors(async(req, res, next)=>{
        const {email, password} = req.body;
        console.log(req.body)
        if(!email ||!password) return next(new ErrorHandler("Email and Password are required", 400))
            
        const seller = await sellerSchema.findOne({email})
        if(!seller) return next(new ErrorHandler("User not found", 404))
        if(!seller.isActivated) return next(new ErrorHandler("Activation required",400));

        const isPasswordCorrect = await seller.comparePassword(password)
        if(!isPasswordCorrect) return next(new ErrorHandler("Invalid Credentials", 400))
            try{
                const token = await seller.getJwtToken()
                res.cookie('authenticate-token', token, {httpOnly: false, secure:true, sameSite:'none'})
                
                res.status(201).json({
                    auth:true,
                    success: true,
                    message: `${seller.name} Logged in Successfully`,
                    data:seller
                });
        
            }catch(e){
            
            next(new ErrorHandler('Internal Server Error', 500))
        }
        

    
    })
);
router.post('/seller-signup', upload.single('avatar'), catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, phone } = req.body;
  
    // Check for missing fields
    if (!name || !email || !password || !phone) {
      return next(new ErrorHandler('Missing credentials', 400));
    }
  
    // Check if the seller already exists
    const existingSeller = await sellerSchema.findOne({ email });
    if (existingSeller) {
      return next(new ErrorHandler('Seller already exists', 400));
    }
  
    // Create a new seller instance
    let seller = new sellerSchema({
      name,
      email,
      password,
      phone,
    });
  
    // If avatar is uploaded, convert it to base64 and save to seller object
    if (req.file) {
      const base64Image = req.file.buffer.toString('base64');
      seller.avatar = base64Image; // Save base64 avatar
    }
  
    // Generate activation token
    const activationToken = await seller.createExpirableActivationToken();
    const activateUrl = `http://localhost:5173/activation/${activationToken}`;
  
    // Send activation email
    try {
      await sendEmail({
        email: seller.email,
        subject: 'Activate Your Account',
        message: `Hello ${seller.name}, please click here to activate your account: ${activateUrl}`,
      });
  
      // Save the new seller to the database
      const newSeller = await seller.save();
  
      res.status(200).json({
        success: true,
        message: 'Please check your email for confirmation',
        seller: newSeller, // return saved seller details
      });
    } catch (err) {
      next(new ErrorHandler(err, 500));
    }
  }));
  
module.exports = router;
