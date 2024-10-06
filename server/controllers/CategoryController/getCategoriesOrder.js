

const Category = require("../../models/categorySchema");
const { ErrorHandler } = require("../../utiles");

const getNestedCategories = async (data) => {
    // Create a dictionary to store the categories
    let categories = {};
  
    // Iterate over the data and create a dictionary for each category
    data.forEach((item) => {
      categories[item._id] = {
        id: item._id,
        name: item.name,
        level: item.level,
        parentId: item.parentId,
        slug:item.slug,
        children: [],
      };
    });
  
    // Create a reStructure by assigning children to their parents
    let reStructure = [];
    Object.keys(categories).forEach((key) => {
      let category = categories[key];
      if (category.parentId === null) {
        reStructure.push(category);
      } else {
        categories[category.parentId].children.push(category);
      }
    });
  
    // Return the reStructure structure
    return reStructure;
  };
  
const categoriesOrder = async (req, res, next) => {
    try {
      const categories = await Category.find();
      const nestedCategories = await getNestedCategories(categories);
      res.status(200).json({
        success: true,
        data: nestedCategories,
        message: "Categories fetched successfully",
      });
    } catch (e) {
        return next(new ErrorHandler("Internal Server Error, try again later", 500));
 
    }
  }
module.exports = {categoriesOrder}