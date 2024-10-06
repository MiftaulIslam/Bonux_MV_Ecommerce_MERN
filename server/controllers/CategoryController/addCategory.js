const { ErrorHandler } = require("../../utiles");

const Category = require('../../models/categorySchema');


const createCategory = async (name, area, parentId) => {
  const parentCategory = await Category.findById(parentId);
  const level = parentCategory ? parentCategory.level + 1 : 0;
  return { name, area, level, parentId };
};

const addCategory = async (req, res, next) => {
  let { name, area, parentId } = req.body;
  if (parentId === '' || parentId === 'null') parentId = null;
  if (!name) return next(new ErrorHandler("Name is required", 400));
  const categoryData = await createCategory(name, area, parentId);
  if (req.file) {
    const base64Image = req.file.buffer.toString('base64');
    if (!base64Image) return next(new ErrorHandler("Image is required", 400));
    categoryData.image = base64Image;
  }
  
  try {
    const createdCategory = await Category.create({ ...categoryData });
    res.status(201).json({
      success: true,
      data: createdCategory,
      message: "Category added successfully",
    });
  } catch (e) {
    next(new ErrorHandler('Internal server error', 500));
  }
};

module.exports = { addCategory };
