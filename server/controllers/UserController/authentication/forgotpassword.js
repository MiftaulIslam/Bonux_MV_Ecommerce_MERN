
const userScheme = require('../../../models/userScheme');
const ErrorHandler = require('../../../utiles/ErrorHandler')

const { sendEmail } = require('../../../utiles/MailSender');
const forgotPassword = async (req, res, next) =>{

    
    const {email} = req.body

    if(!email) return next(new ErrorHandler("Email is required", 400))
    
        const user = await userScheme.findOne({email})

        if(!user) return next(new ErrorHandler("User not found", 404))

            console.log('User is '+ user)
    const activationToken = await user.createExpirableActivationToken()
    
    // const activateUrl = `http://localhost:3000/user/confirm-password/${activationToken}`
    const activateUrl = `http://localhost:5173/confirm-password/${activationToken}`

    //send mail
    try{
        sendEmail({
            email: user.email,
            subject: "Forget password",
            message: `Hello ${user.name}, please click here to set a new password: ${activateUrl}`
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