const userScheme = require("../../../models/userScheme")
const ErrorHandler = require("../../../utiles/ErrorHandler")
const { sendEmail } = require("../../../utiles/MailSender")


const requestActivation =async (req, res, next) => {
    console.log(req.body)
    const {email} = req.body

    if(!email) return next(new ErrorHandler("Email is required", 400))
    const existingUser = await userScheme.findOne({email})
    if(existingUser.isActivated) return next(new ErrorHandler("User already verified", 400))
    if(!existingUser) return next(new ErrorHandler("User not found", 404))

    const activationToken = await existingUser.createExpirableActivationToken()
    const activateUrl = `http://localhost:5173/activation/${activationToken}`
    //send mail
    try{
        
        sendEmail({
            email: existingUser.email,
            subject: "Activate Your Account",
            message: `Hello ${existingUser.name}, please click here to activate your account: ${activateUrl}`
        })
        res.status(200).json({
            success: true,
            message: "Activation Email has been sent to your email address"
        })
    }catch(err){
        console.log(err)
        next(new ErrorHandler("Internal Server error", 500))
    }
}
module.exports = {requestActivation}