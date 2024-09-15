const Product = require ('../../models/ProductSchema');
const { ErrorHandler } = require('../../utiles');

const deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    if(!id){next(new ErrorHandler('Invalid id', 400))}
    const deletedProduct = await Product.findByIdAndDelete(id)
    if(!deletedProduct) next(new ErrorHandler('Product not found'))
      res.status(200).json({
        success: true,
        data: deletedProduct,
        message: "Product deleted successfully",
      });
   
}
module.exports = {deleteProduct}