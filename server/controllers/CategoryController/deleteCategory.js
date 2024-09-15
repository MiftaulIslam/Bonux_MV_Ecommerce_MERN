const { ErrorHandler } = require("../../utiles");
const Category = require('../../models/CategorySchema')
// Recursive function to collect all category IDs to delete
const collectCategoryIdsToDelete = async (id, idsToDelete = new Set()) => {
    // Add current category ID to the set
    idsToDelete.add(id);
  
    // Find children of the current category
    const children = await Category.find({ parentId: id });
  
    // Recursively collect IDs of all children
    for (const child of children) {
      await collectCategoryIdsToDelete(child._id, idsToDelete);
    }
  
    return idsToDelete;
  };
  
  
const deleteCategory =async (req, res, next) => {
    const { id } = req.params;

    if (!id){
        next(new ErrorHandler('Invalid category id', 400))}

    try {
      // Collect all category IDs to delete
      const idsToDelete = await collectCategoryIdsToDelete(id);

      // Convert Set to Array for MongoDB query
      const idsArray = Array.from(idsToDelete);

      // Perform a single batch delete operation
      const result = await Category.deleteMany({ _id: { $in: idsArray } });

      if (result.deletedCount === 0) {
        next(new ErrorHandler('No items found to delete', 400))
      }

      res.status(200).json({
        success: true,
        message: "Categories and their children deleted successfully",
      });

    } catch (error) {
        next(new ErrorHandler('Internal Server Error', 500))
    }
  }
module.exports = {deleteCategory}