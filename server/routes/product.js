const express = require("express");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { ErrorHandler, upload } = require("../utiles");
const productSchema = require("../models/ProductSchema");
const categorySchema = require("../models/categorySchema");
const { deleteProduct } = require("../controllers/ProductController/deleteProduct");
const { updateProduct } = require("../controllers/ProductController/updateProduct");
const { addProduct } = require("../controllers/ProductController/addProduct");
const { getProduct } = require("../controllers/ProductController/getProduct");
const { getProducts } = require("../controllers/ProductController/getProducts");

const router = express.Router();
// Get all products
// router.get(
//   "/products",
//   catchAsyncErrors(getProducts)
// );

// // Get product by id
// router.get(
//   "/get-product-by-id/:id",
//   catchAsyncErrors(getProduct)
// );

// Add product
router.post(
  "/add",
  upload.array('image'),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { ...data } = req.body;

      if (!data.name) return next(new ErrorHandler('Name is required', 400));
      if (!data.category) return next(new ErrorHandler('Category is required', 400));

      const existingProduct = await productSchema.findOne({ name: data.name });
      if (existingProduct) return next(new ErrorHandler('Product name is already taken', 400));

      const product = await productSchema.create({
        name: data.name,
        description: data.description,
        specification: data.specification,
        price: {
          original_price: data.original_price,
          discount_percentage: data.discount_percentage,
        },
        images: [],
        stock: {
          quantity: data.quantity,
          status: data.quantity > 0 ? 'in stock' : 'out of stock',
        },
        attributes: {
          color: data.color,
          size: data.size,
          weight: data.weight,
        },
        status: data.status,
        delivery: {
          delivery_time: Math.ceil((new Date(data.estimated_delivery_date) - new Date()) / (1000 * 60 * 60 * 24)),
          estimated_delivery_date: data.estimated_delivery_date,
        },
        store: data.store,
        category: data.category,
      });

      const category = await categorySchema.findById(data.category);
      if (!category) return next(new ErrorHandler('Category not valid', 400));
      
      product.category_slug = category.slug;

      if (req.files) {
        req.files.forEach((img, index) => {
          product?.images?.push({
            url: img.buffer.toString('base64'),
            alt_text: `${product.name}-${index}`,
          });
        });
      }

      await product.save();

      res.json({
        success: true,
        data: product,
        message: "Product added successfully",
      });
    } catch (err) {
      return next(new ErrorHandler(err.message || 'Internal Server Error', 500));
    }
  })
);


// // Update Product
// router.put(
//   "/update/:id",
//   catchAsyncErrors(updateProduct)
// );

// // Delete Product
// router.delete(
//   "/delete/:id",
//   catchAsyncErrors(deleteProduct));

module.exports = router;
