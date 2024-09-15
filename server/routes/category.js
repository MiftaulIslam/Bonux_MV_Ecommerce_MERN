
const express = require("express");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const {  upload } = require("../utiles");
const { categoriesOrder } = require("../controllers/CategoryController/getCategoriesOrder");
const { categoriesRaw } = require("../controllers/CategoryController/getCategoriesRaw");
const { getCategory } = require("../controllers/CategoryController/getCategory");
const { addCategory } = require("../controllers/CategoryController/addCategory");
const { updateCategory } = require("../controllers/CategoryController/updateCategory");
const { deleteCategory } = require("../controllers/CategoryController/deleteCategory");

const router = express.Router();




//Get Categories
router.get(
  "/categories-order",
  catchAsyncErrors( categoriesOrder))

//Get raw Categories
router.get("/categories-raw",catchAsyncErrors(categoriesRaw));

//Get by id
router.get(
  "/get-category/:id",
  catchAsyncErrors(getCategory)
);

//Add category
router.post(
  "/add",upload.single('image'),
  catchAsyncErrors(addCategory)
);
router.put(
  "/update-category/:id",
  upload.single('image'),
  catchAsyncErrors(updateCategory)
);


// Delete Category and its Nested Children
router.delete(
  "/delete-category/:id",
  catchAsyncErrors(deleteCategory)
);

module.exports = router;
