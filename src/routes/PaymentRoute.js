const express = require("express");
const { Checkout,PaymentVerification,CheckoutFinal,paymentSuceessOrders } = require("../controllers/PaymentControl");

const router = express.Router();

router.route("/checkout").post(Checkout)

router.route("/PaymentVerification").post(PaymentVerification)
router.route("/OrderSave").post(CheckoutFinal)
router.route("/paySuc").get(paymentSuceessOrders)
module.exports = router;
