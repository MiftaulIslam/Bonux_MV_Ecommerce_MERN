const userScheme = require("../../../models/userScheme");
const ErrorHandler = require("../../../utiles/ErrorHandler");

const getUser = async (req, res, next) => {
  try {
    const user = await userScheme.findById(req.user);

    if (!user) return next(new ErrorHandler("User not found", 404));
    res.status(200).json({
      success: true,
      message: user,
    });
  } catch (err) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
};
module.exports = {getUser}