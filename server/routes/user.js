const express = require('express');
const {ErrorHandler, upload} = require('../utiles/index')
const {isAuthenticated, catchAsync} = require('../middlewares/index')
const {userLogin, userRegister, forgotPassword, confirmForgotPassword, getUser} = require('../controllers/index');
const userSchema = require('../models/userScheme');
const router = express.Router();


//signup
router.post('/register',upload.single('avatar'), catchAsync(userRegister))

//login
router.post('/login', upload.none(),  catchAsync(userLogin))

//logout
router.get('/logout', upload.none(),  catchAsync((req, res, next)=>{
    try{

        res.clearCookie('authenticate-token')
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        })
    }catch(err){
        next(new ErrorHandler("Failed to logged out", 500))
    }
}))
//forgot password
router.post('/forgot-password', upload.none(),  catchAsync(forgotPassword))
//confirm password
router.post('/confirm-password/:token',upload.none(), catchAsync(confirmForgotPassword))
//get user, validating with token
router.get('/getuser',upload.none(),isAuthenticated, catchAsync(getUser))

// User info
router.put('/update-info',upload.single('avatar'),isAuthenticated, catchAsync(async (req, res, next)=>{
const {...data} = req.body;
const id = req.id
console.log(data)
if(!data) return next(new ErrorHandler("No data provided", 400))
if(!id) return next(new ErrorHandler(" Authentication failed",400))
    const user = await userSchema.findById(id)
if(!user) return next(new ErrorHandler("Invalid user",400))
    try {
if(req.file){
    const base64Image = req.file.buffer.toString('base64');

    data.avatar = base64Image
}
        
        const updatedUser = await userSchema.findByIdAndUpdate(id, data,{new:true}) 
        console.log(updatedUser)
        res.status(200).json({
            success: true,
            message: 'User info updated successfully',
            data: updatedUser
        })
    } catch (error) {
        next(new ErrorHandler("Internal Server Error",500))
    }
}))

// -------------Addresses manipulation
router.put('/add-address', upload.none(), isAuthenticated, catchAsync(async (req, res, next) => {
    const { ...address } = req.body;
    console.log(req.body)
    if (!address.address || !address.region || !address.city || !address. zone) {
        return next(new ErrorHandler('All fields are required', 400));
    }

    const id = req.id;
    if (!id) return next(new ErrorHandler("Authentication failed", 400));

    const updatedUser = await userSchema.findByIdAndUpdate(id, { $push: { addresses: address } });

    res.status(200).json({
        success: true,
        message: 'User address added successfully',
        data:updatedUser
    });
}));
router.put('/update-address/:id', upload.none(), isAuthenticated, catchAsync(async (req, res, next) => {
    const { id } = req.params; 
    const { address, region, city, zone} = req.body;

    // Validate input
    if (!address || !region || !city || !zone) {
        return next(new ErrorHandler('All fields are required', 400));
    }

    const userId = req.id; // User ID from authentication
    if (!userId) return next(new ErrorHandler("Authentication failed", 400));

    try {
        // directly Updating the address 
        const updatedUser = await userSchema.findOneAndUpdate(
            { _id: userId, 'addresses._id': id }, // Find user and specific address by ID
            { 
                $set: { 
                    'addresses.$.address': address,
                    'addresses.$.region': region,
                    'addresses.$.city': city,
                    'addresses.$.zone': zone,
                }
            },
            { new: true} 
        );

        if (!user) return next(new ErrorHandler("User or address not found", 404));

        res.status(200).json({
            success: true,
            message: 'Address updated successfully',
            data: updatedUser
        });
    } catch (error) {
        next(new ErrorHandler(error.message || "Internal Server Error", 500));
    }
}));router.delete('/delete-address/:id', upload.none(), isAuthenticated, catchAsync(async (req, res, next) => {
    const { id } = req.params; 
    const userId = req.id; // User ID from authentication

    if (!userId) return next(new ErrorHandler("Authentication failed", 400));

    try {
        // Find the user and pull the address from the addresses array
        const user = await userSchema.findOneAndUpdate(
            { _id: userId }, 
            { $pull: { addresses: { _id: id } } }, // Remove the address with the specified ID
            { new: true } 
        );

        if (!user) return next(new ErrorHandler("User not found", 404));

        res.status(200).json({
            success: true,
            message: 'Address deleted successfully',
            data: user
        });
    } catch (error) {
        next(new ErrorHandler(error.message || "Internal Server Error", 500));
    }
}));

router.put('/update-paymentaddress/:id', upload.none(), isAuthenticated, catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.id;
    const {type} = req.body;
    if (!id) return next(new ErrorHandler('Invalid address ID', 400));

    try {
        const user = await userSchema.findById(userId);
        if (!user) return next(new ErrorHandler("User not found", 404));

        // Find the address by _id
        const address = user.addresses.id(id); 
        if (!address) return next(new ErrorHandler("Address not found", 404));
        if(type == 'shipping'){

        // Reset all addresses' defaultShipping to false
        user.addresses.forEach(a => a.defaultShipping = false);
        
        // Set the selected address' defaultShipping to true
        address.defaultShipping = true;

        }else{            
        // Reset all addresses' defaultBilling to false
        user.addresses.forEach(a => a.defaultBilling = false);
        
        // Set the selected address' defaultBilling to true
        address.defaultBilling = true;

        }
        // Save the updated user document
        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            message: 'Payment address updated successfully',
            data: updatedUser
        });
    } catch (error) {
        next(new ErrorHandler(error.message || "Internal Server Error", 500));
    }
}));

module.exports = router;