const ErrorHandler = require("../utiles/ErrorHandler");
const { jwtVerify } = require("../utiles/jwtVerify");
const catchAsync = require("./catchAsyncErrors");

exports.isAuthenticated = catchAsync(async (req, res, next) => {
  const token = req.cookies['authenticate-token'];
  if (!token) {
    return next(new ErrorHandler("Invalid token", 401));
  }

  try {
    const decoded = await jwtVerify(token);
    if (!decoded) {
      return next(new ErrorHandler("Invalid token", 401));
    }
    req.user = decoded.id;
    next();
  } catch (error) {
    return next(new ErrorHandler("Token verification failed", 401));
  }
});
