const express = require('express');
// const ErrorHandler = require('../../utiles/ErrorHandler')
// const catchAsync = require('../../middlewares/catchAsyncErrors');
// const upload = require('../../utiles/multer');
const {ErrorHandler, upload} = require('../../utiles/index')
// const { isAuthenticated } = require('../../middlewares/auth');
const {isAuthenticated, catchAsync} = require('../../middlewares/index')
const {userLogin, userRegister, forgotPassword, confirmForgotPassword, getUser} = require('../../controllers/index')
const router = express.Router();


//signup
router.post('/register',upload.single('avatar'), catchAsync(userRegister))

//login
router.post('/login', upload.none(),  catchAsync(userLogin))

//logout
router.post('/logout', upload.none(),  catchAsync((req, res, next)=>{
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

module.exports = router;