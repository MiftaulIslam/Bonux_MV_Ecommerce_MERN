const { ErrorHandler } = require("../../utiles");
const category = require("../../models/categorySchema")
const getCategory = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {next(new ErrorHandler('Invalid Id', 400));}
    try{
        const Existingcategory = await category.findById(id);
        if (!Existingcategory) {next(new ErrorHandler('No item found', 404))}
        res.status(200).json({
          success: true,
          data: Existingcategory,
          message: `Category fetched successfully`,
        });
    }catch(e){    
    next(new ErrorHandler('Invalid Id', 400))
    }
  }
module.exports = {getCategory}