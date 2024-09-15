
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../../../utiles/ErrorHandler');

const userScheme = require('../../../models/userScheme');
const ActiveAccount = async(req, res, next)=>{
const {token} = req.params

if(!token) return next(new ErrorHandler("Invalid token", 400))
    const userDecoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
const {id} = userDecoded

const user = await userScheme.findByIdAndUpdate(id, {isActivated: true}, {new: true})
if(!user) return next(new ErrorHandler("User not found", 404))
    res.status(200).json({
        success: true,
        message: "Account Activated",
    });
}
module.exports = {ActiveAccount}