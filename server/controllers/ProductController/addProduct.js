const Product = require("../../models/ProductSchema");
const { ErrorHandler } = require("../../utiles");


const addProduct = async (req, res, next) => {
    const { ...data } = req.body;
    
    if(!data.category) next(new ErrorHandler('Category is required', 400))
    if (
      !data.name ||
      !data.description ||
      !data.specification ||
      !data.price ||
      !data.stock.quantity
    ) {
      next(
        new ErrorHandler(
          "Credentials are missing, please provide necessary details",
          400
        )
      );
    }


    const selectedCategory = await Category.findById(data.category)
    if(!selectedCategory) next(new ErrorHandler('Category not valid', 400))
    data.category_slug = selectedCategory.slug
    
    if(req.file){
        data.image = req.file.buffer.toString('base64');
    }
    try {
        const createdProduct = await Product.create({...data});
        res.status(200).json({
            success: true,
            data: createdProduct,
            message: "Product added successfully",
        });
    } catch (e) {
      next(new ErrorHandler("Internal server error" + e, 500));
    }
  }

  module.exports = {addProduct}