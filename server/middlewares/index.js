const { isAuthenticated } = require("./auth");
const catchAsync = require("./catchAsyncErrors");

module.exports ={
    isAuthenticated,
    catchAsync,
}