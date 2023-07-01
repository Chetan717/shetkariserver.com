const mongoose = require("mongoose");

// Define the schema
const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  form: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  praman: {
    type: String,
    required: true,
  },

  main_ingredient: {
    type: [String],
    required: true,
  },
  Quantity: {
    type: [String],
    required: true,
  },
  pricelist: {
    type: [String],
    required: true,
  },
  Advantages: {
    type: [String],
    required: true,
  },
  review: {
    type: [String],
    required: true,
  },
  image: {
    type: [String],
    required: true,
  },
});

// Create the model
const ProductModel = mongoose.model("ProductData", productSchema);

module.exports = ProductModel;
