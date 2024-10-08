const ErrorHandler = require("../utiles/ErrorHandler");
const { jwtVerify } = require("../utiles/jwtVerify");
const catchAsync = require("./catchAsyncErrors");

exports.isAuthenticated = catchAsync(async (req, res, next) => {
  const token = req.cookies['authenticate-token'];
  console.log(token)
  if (!token) {
    return next(new ErrorHandler("Login to access", 401));
  }

  try {
    const decoded = await jwtVerify(token);
    if (!decoded) {
      return next(new ErrorHandler("Failed to load user", 401));
    }
    req.id = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    return next(new ErrorHandler("Token verification failed", 401));
  }
});
