const mongoose = require('mongoose');
const Category = require("../models/categorySchema");

mongoose.connect('mongodb://miftaulislam005:badshamiftaul005@ac-n7u27xs-shard-00-00.0kzzj0i.mongodb.net:27017,ac-n7u27xs-shard-00-01.0kzzj0i.mongodb.net:27017,ac-n7u27xs-shard-00-02.0kzzj0i.mongodb.net:27017/myDatabase?authSource=admin&replicaSet=atlas-qok6to-shard-0&retryWrites=true&w=majority&ssl=true', { useNewUrlParser: true, useUnifiedTopology: true });

async function up () {
  // Write migration here
  const categories = await Category.find();
  console.log(categories)
  for (const category of categories) {
    await category.save();
  }
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  // Write migration here
}

module.exports = { up, down };