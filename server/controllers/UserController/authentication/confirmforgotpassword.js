const userScheme = require("../../../models/userScheme")
const { jwtVerify } = require("../../../utiles/jwtVerify")
const ErrorHandler = require("../../../utiles/ErrorHandler")
const confirmForgotPassword = async (req, res, next) =>{
const {password} = req.body

if(!password) return next(new ErrorHandler("Password is required", 400))

const {token} = req.params

if(!token) return next(new ErrorHandler("Invalid token", 400))
const userDecoded = jwtVerify(token)

const {id} = userDecoded

const user = await userScheme.findById(id)

if(!user) return next(new ErrorHandler("User not found", 404))
    const isMatch = await user.comparePassword(password)
if(isMatch) return next(new ErrorHandler("New password cannot be same as old password", 400))
user.password = password
await user.save()
    res.status(200).json({
        success: true,
        message: "Password Changed successfully",
    });

}
module.exports = {confirmForgotPassword}