const { confirmForgotPassword } = require("./UserController/authentication/confirmforgotpassword");
const { forgotPassword } = require("./UserController/authentication/forgotpassword");
const { getUser } = require("./UserController/authentication/getUser");
const { userLogin } = require("./UserController/authentication/login");
const { userRegister } = require("./UserController/authentication/register");
const {requestActivation} = require('./UserController/activation/requestActive')
const {ActiveAccount} = require('./UserController/activation/Activation')

module.exports = {
    userLogin,
    userRegister,
    forgotPassword,
    confirmForgotPassword,
    getUser,requestActivation, ActiveAccount
    
}