const jwt = require ('jsonwebtoken');

const jwtVerify = (token) =>{

    return jwt.verify(token, process.env.JWT_SECRET_KEY)
}
module.exports = {jwtVerify}