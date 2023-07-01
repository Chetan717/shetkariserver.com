const mongoose = require("mongoose");
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const d = new Date();
let monthName = month[d.getMonth()];


// Define the schema for the distributor order
const distOrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    maxlength: 15,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  selectedQuan: {
    type: String,
    required: true,
  },
  selectedOption: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    default: monthName,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  DeliveredAt: {
    type: Date,
  },
  Active: {
    type: Boolean,
    default: true,
  },
  ProcessStatus: {
    type: Boolean,
    default: false,
  },
  DeliveryStatus: {
    type: Boolean,
    default: false,
  },
  cancelStatus: {
    type: Boolean,
    default: false,
  },
  canceledByUser: {
    type: Boolean,
    default: false,
  },
});

const DistrubutorModal = mongoose.model("DistOrder", distOrderSchema);

module.exports = DistrubutorModal;
