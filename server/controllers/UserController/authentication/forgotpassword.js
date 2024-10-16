
const sellerSchema = require('../../../models/sellerSchema');
const userScheme = require('../../../models/userScheme');
const ErrorHandler = require('../../../utiles/ErrorHandler')

const { sendEmail } = require('../../../utiles/MailSender');
const forgotPassword = async (req, res, next) =>{

    
    const {email, role} = req.body

    if(!email) return next(new ErrorHandler("Email is required", 400))
    if(!role) return next(new ErrorHandler("Role is required", 400))
        
    let activationToken
    let recipientName;
    let recipientEmail;
    if(role === 'user'){
        const user = await userScheme.findOne({email})
        if(!user) return next(new ErrorHandler("User not found", 404))
        activationToken = await user.createExpirableActivationToken()
        recipientName = user.name
        recipientEmail = user.email
} 
if(role==='seller'){
    const seller = await sellerSchema.findOne({email})
    if(!seller) return next(new ErrorHandler("Seller not found", 404))
    activationToken = await seller.createExpirableActivationToken()
    recipientName = seller.name
    recipientEmail = seller.email
    }


    
    // const activateUrl = `http://localhost:3000/user/confirm-password/${activationToken}`
    // const activateUrl = `https://bonux-mvec.onrender.com/confirm-password/${activationToken}`
    const activateUrl = `http://localhost:5173/confirm-password/${activationToken}`

    //send mail
    try{
        sendEmail({
            email: recipientEmail,
            subject: "Forget password",
            message: `Hello ${recipientName}, please click here to set a new password: ${activateUrl}`
        })
    
        res.status(200).json({
            success: true,
            message: "Forgot password email has been sent successfully",
        })
    }catch(err){
            next(new ErrorHandler("Internal Server error", 500))
    }

}

module.exports = {forgotPassword}