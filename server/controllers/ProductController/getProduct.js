const Product = require("../../models/ProductSchema");
const { ErrorHandler } = require("../../utiles");


const getProduct = async (req, res, next) => {
    const { id } = req.params;

    try {
      // fetch products from db
      const product = await Product.findById(id);
      if (!product)  next(new ErrorHandler("Product not found", 400));
      // return products
      res.status(200).json({
        success: true,
        data: product,
        message: "Product fetched successfully",
      });
    } catch (e) {
      next(new ErrorHandler(` Internal server error`, 500));
    }
  }
  module.exports = {getProduct}