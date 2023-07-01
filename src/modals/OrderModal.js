const mongoose = require("mongoose");

// schema for the ticket 


const timeSchema = { //time schema
  type: 'string',
  pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$'
};

const ProductSchema = new mongoose.Schema({
  moviename: { type: String, required: true },
  date: { type: Date, required: true },
  time:timeSchema,
  active: {
    type:Boolean,
  },
  timeMovie: { type: String, required: true },
  user: {
    type: {
      name: { type: String },
      pass: { type: String },
      email: { type: String, format: "email" },
    },
    required: ["name", "pass", "email"],
  },
  location: { type: String, required: true },
  selectedSeats: [{ type: String, required: true }],
  price: { type: Number, required: true },
});


const OrderModal = new mongoose.model("BookedTicket", ProductSchema);
module.exports = OrderModal;
