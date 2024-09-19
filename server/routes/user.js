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
router.post('/update-info',upload.single('avatar'),isAuthenticated, catchAsync(async (req, res, next)=>{
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
        
        const updatedUser = await userSchema.findByIdAndUpdate(id, data) 
        res.status(200).json({
            success: true,
            message: 'User info updated successfully',
            data: updatedUser
        })
    } catch (error) {
        next(new ErrorHandler("Internal Server Error",500))
    }
}))

module.exports = router;