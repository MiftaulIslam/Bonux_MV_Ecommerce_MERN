const Product = require("../../models/ProductSchema");
const { ErrorHandler } = require("../../utiles");


const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    if(!id){next(new ErrorHandler('Invalid id', 400))}
    
    const { ...data } = req.body;
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
const existingProduct = await Product.findById(id)
if(!existingProduct) next(new ErrorHandler('Product not found'))
  if(existingProduct.category !== data.category){
    const selectedCategory = await Category.findById(data.category)
    if(!selectedCategory) next(new ErrorHandler('Category not valid', 400))
    data.category_slug = selectedCategory.slug
    
  } 
    if(!data.category) next(new ErrorHandler('Category is required', 400))

    
    if(req.file){
        data.image = req.file.buffer.toString('base64');
    }
    try {
      
    const update = await Product.findOneAndUpdate({ _id: id },data, { new: true });
        res.status(200).json({
            success: true,
            data: update,
            message: "Product added successfully",
        });
    } catch (e) {
      next(new ErrorHandler("Internal server error", 500));
    }
  }

module.exports = {updateProduct}