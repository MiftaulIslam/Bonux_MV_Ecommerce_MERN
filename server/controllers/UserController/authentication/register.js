
const userScheme = require('../../../models/userScheme');
const ErrorHandler = require('../../../utiles/ErrorHandler');
const { sendEmail } = require('../../../utiles/MailSender');

const userRegister = async(req, res, next)=>{
    const {name, email, password} = req.body; 
    if(!name || !email || !password) return next(new ErrorHandler("Name, Email and Password are required", 400))
    const existingUser = await userScheme.findOne({email})
    
    if(existingUser) return next(new ErrorHandler("User Already exists", 400))
        const base64Image = req.file.buffer.toString('base64');
        if(!base64Image) return next(new ErrorHandler("Image is required", 400))
    
        const user = new userScheme({
            name,
            email,
            password,
            avatar: base64Image
        })

        const activationToken = await user.createExpirableActivationToken()
        const activateUrl = `https://bonux-mvec.onrender.com/activation/${activationToken}`
        // const activateUrl = `http://localhost:5173/activation/${activationToken}`

        //send mail
        try{
            sendEmail({
                email: user.email,
                subject: "Activate Your Account",
                message: `Hello ${user.name}, please click here to activate your account: ${activateUrl}`
            })
            const newUser = await userScheme.create(user);
        await user.save();
        
            res.status(200).json({
                success: true,
                message: "Please check your email for confirmation",
                newUser
            })
        }catch(err){
                next(new ErrorHandler("Internal Server error", 500))
        }

        
    
    
    }
    module.exports = {userRegister}
