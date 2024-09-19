
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../../../utiles/ErrorHandler');

const userScheme = require('../../../models/userScheme');
const sellerSchema = require('../../../models/sellerSchema');
const ActiveAccount = async(req, res, next)=>{
const {token} = req.params

if(!token) return next(new ErrorHandler("Invalid token", 400))
    const userDecoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
const {id, role, name} = userDecoded

if(role === 'user'){
    const user = await userScheme.findByIdAndUpdate(id, {isActivated: true}, {new: true})
    if(!user) return next(new ErrorHandler("User not found", 404))
}
if(role==='seller'){
const seller = await sellerSchema.findByIdAndUpdate(id, {isActivated: true}, {new: true})
if(!seller) return next(new ErrorHandler("seller not found", 404))
}

    res.status(200).json({
        success: true,
        message: `${name}'s account has been activated`,
        role:role
    });
}
module.exports = {ActiveAccount}