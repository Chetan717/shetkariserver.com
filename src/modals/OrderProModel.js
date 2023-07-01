const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  selectedOption: {
    type: Number,
    required: true,
  },
  selectedQuan: {
    type: Number,
    required: true,
  },
  form: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const addressSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  referenceMobileNumber: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
});

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

const orderSchema = new mongoose.Schema({
  productsDetails: [productSchema],
  orderid: {
    type: String,
    required: true,
  },
  customer: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
  },
  address: [addressSchema],
  totalAmount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  month: {
    type: String,
    default: monthName,
  },
  active: {
    type: Boolean,
    default: true,
  },
  process: {
    type: Boolean,
    default: false,
  },
  delivered: {
    type: Boolean,
    default: false,
  },
  canceled: {
    type: Boolean,
    default: false,
  },
  canceledByUser: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model("Orderfinal", orderSchema);

module.exports = Order;
