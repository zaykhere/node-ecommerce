const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  imagePath: {
    type: String,
    required: [true, "Please add an image"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: 2,
    maxlength: 30,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: 10,
    maxlength: 1000,
  },
  price: {
    type: Number,
    required: [true, "Please add the price"],
  },
});

let Product = mongoose.model("Product", productSchema);
module.exports = Product;
