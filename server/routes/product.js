const express = require("express");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { ErrorHandler, upload } = require("../utiles");
const Product = require("../models/ProductSchema");
const Category = require("../models/categorySchema");
const { deleteProduct } = require("../controllers/ProductController/deleteProduct");
const { updateProduct } = require("../controllers/ProductController/updateProduct");
const { addProduct } = require("../controllers/ProductController/addProduct");
const { getProduct } = require("../controllers/ProductController/getProduct");
const { getProducts } = require("../controllers/ProductController/getProducts");

const router = express.Router();
// Get all products
router.get(
  "/products",
  catchAsyncErrors(getProducts)
);

// Get product by id
router.get(
  "/get-product-by-id/:id",
  catchAsyncErrors(getProduct)
);

// Add product
router.post(
  "/add",
  catchAsyncErrors(addProduct)
);

// Update Product
router.put(
  "/update/:id",
  catchAsyncErrors(updateProduct)
);

// Delete Product
router.delete(
  "/delete/:id",
  catchAsyncErrors(deleteProduct));

module.exports = router;
