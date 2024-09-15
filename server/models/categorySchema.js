const mongoose = require("mongoose");

const slugify = require("slugify");
const { ErrorHandler } = require("../utiles");
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a category name"],
  }, slug: {
    type: String,
    unique: true,
  },
  area: {
    type: String,
    required: [true, "Please enter the area"],
    default: "client",
  },
  level: {
    type: Number,
  },
  image:{
    type:String
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
    index: true
  },
});
categorySchema.index({ parentId: 1 });
categorySchema.pre("save", async function(next) {
    if (this.parentId) {
   
        const Category = mongoose.model("Category");
        const parentCategory = await Category.findById(this.parentId);
        this.slug = `${parentCategory.slug}%${slugify(this.name, { lower: true })}`;
        this.level = parentCategory ? parentCategory.level + 1 : 0;
    }else{

        this.slug = slugify(this.name, { lower: true });
    }
    next();
  });


  module.exports = mongoose.model("Category", categorySchema);;
