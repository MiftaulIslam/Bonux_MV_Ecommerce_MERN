const sellerSchema = require("../../../models/sellerSchema")
const userScheme = require("../../../models/userScheme")
const ErrorHandler = require("../../../utiles/ErrorHandler")
const { sendEmail } = require("../../../utiles/MailSender")


const requestActivation =async (req, res, next) => {
    console.log(req.body)
    const {email, role} = req.body

    if(!email) return next(new ErrorHandler("Email is required", 400))
    if(!role) return next(new ErrorHandler("Role is required", 400))
        let activationToken;
    
    let recipientName;
    let recipientEmail;
        if(role === 'user'){

            const existingUser = await userScheme.findOne({email})
            if(!existingUser) return next(new ErrorHandler("User not found", 404))
            if(existingUser.isActivated) return next(new ErrorHandler("User already verified", 400))
                activationToken = await existingUser.createExpirableActivationToken()
            recipientName = existingUser.name
            recipientEmail = existingUser.email
        }if(role==='seller'){
            const existingSeller = await sellerSchema.findOne({email})
            if(!existingSeller) return next(new ErrorHandler("Seller not found", 404))
            if(existingSeller.isActivated) return next(new ErrorHandler("Seller already verified", 400))
                activationToken = await existingSeller.createExpirableActivationToken()
            recipientName = existingSeller.name
            recipientEmail = existingSeller.email
        }

    
    const activateUrl = `https://bonux-mvec.onrender.com/activation/${activationToken}`
    //send mail
    try{
        
        sendEmail({
            email: recipientEmail,
            subject: "Activate Your Account",
            message: `Hello ${recipientName}, please click here to activate your account: ${activateUrl}`
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
