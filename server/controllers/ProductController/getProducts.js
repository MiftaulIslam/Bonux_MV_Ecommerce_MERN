const productSchema = require("../../models/ProductSchema");
const { ErrorHandler } = require("../../utiles");


const getProducts = async (req, res, next) => {
  const storeId = req.query.store
    try {
      // fetch products from db
      const products = await productSchema.find({store:storeId});
      // return products
      res.status(200).json({
        success: true,
        data: products,
        message: "Products fetched successfully",
      });
    } catch (e) {
      next(new ErrorHandler("Internal server error", 500));
    }
  }

  module.exports = { getProducts }
