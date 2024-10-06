const { ErrorHandler } = require("../../utiles");

const Category = require("../../models/categorySchema");

const categoriesRaw = async (req, res, next) => {
    try {

      const categories = await Category.find().select("-__v");
      
      res.status(200).json({
        success: true,
        data: categories,
        message: "Categories fetched successfully",
      });
    } catch (e) {
            next(new ErrorHandler('Internal Server Error, try again later', 500))
    }
  }
  module.exports = {categoriesRaw}