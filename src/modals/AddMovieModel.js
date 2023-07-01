const mongoose = require("mongoose");

const citySchema = {
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
};

// modal for MoviesData
const MovieSchema = new mongoose.Schema({
  Product_id: { type: Number, required: true },
  name: { type: String, required: true },
  rate: { type: Number, required: true },
  time: { type: String, required: true },
  location: [citySchema],
  image: { type: String, required: true },
});
const MoviesModal = new mongoose.model("MoviesData", MovieSchema);

module.exports = MoviesModal;
