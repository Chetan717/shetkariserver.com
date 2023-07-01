const mongoose = require("mongoose");

const paymentScheama = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
});

const OrdersPayment = mongoose.model("payments",paymentScheama);

module.exports = OrdersPayment;