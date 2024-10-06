const { ErrorHandler } = require("../../utiles");
const Category = require("../../models/categorySchema")
const updateCategory = async (req, res, next) => {
    const { id } = req.params;
    const { ...data } = req.body;

    if (!data.parentId) {
      data.parentId = null;
    } else {
      const parentCategory = await Category.findById(data.parentId);
      if (!parentCategory) {
        next(new ErrorHandler('Invalid parent Id', 400))
      }

      const hasChild = await Category.find({parentId:id}).countDocuments();

      if(hasChild) {
        next(new ErrorHandler('Already a parent category, cannot be changed to a child category', 400))
      }

      data.level = parentCategory.level + 1;
    }
    let base64Image;
    if(req.file){
      base64Image = req.file.buffer.toString('base64');
      if(!base64Image) return next(new ErrorHandler("Image is required", 400))
        data.image = base64Image
    }
    // Update the category
    const update = await Category.findOneAndUpdate({ _id: id },data, { new: true });
    if (!update) {
        next(new ErrorHandler('No item found', 404))
    }

    res.status(200).json({
      success: true,
      data: update,
      message: `Category updated successfully`,
    });
  }
module.exports = {updateCategory}