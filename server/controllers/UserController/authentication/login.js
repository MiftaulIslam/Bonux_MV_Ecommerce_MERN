
const userScheme = require('../../../models/userScheme');
const ErrorHandler = require('../../../utiles/ErrorHandler')
const userLogin = async (req, res, next)=>{
    
    console.log(req.body)
        const {email, password} = req.body; 
        if( !email || !password) return next(new ErrorHandler(" Email and Password are required", 400))
        const existingUser = await userScheme.findOne({email})
        
        if(!existingUser) return next(new ErrorHandler("User not found", 404))
        if(!existingUser.isActivated) return next(new ErrorHandler("Please activate your account", 400))
        const isPasswordCorrect = await existingUser.comparePassword(password)
        if(!isPasswordCorrect) return next(new ErrorHandler("Invalid Credentials", 400))
        
            const token = await existingUser.getJwtToken()
            res.cookie('authenticate-token', token, {httpOnly: true})
        
            res.status(201).json({
            auth:true, 
            success: true,
            message: `${existingUser.name} Logged in Successfully`,
            data:existingUser,
            token
        })
        
        
        }
module.exports = {userLogin}