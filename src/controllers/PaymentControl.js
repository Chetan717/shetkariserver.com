const instance = require("../../server.js");
const crypto = require("crypto");
const Orderfinal = require("../modals/OrderProModel");
const OrdersPayment = require("../modals/OrdersPayment");
const dotenv = require("dotenv");

dotenv.config({ path: "../../src/.env" });

const Checkout = async (req, res) => {
  try {
    const {} = req.body;

    const inst = instance.instance;
    const amount = Math.round(req.body.Total * 100);

    const options = {
      amount: Number(amount), // amount in smallest currency unit
      currency: "INR",
    };

    const order = await inst.orders.create(options);

    if (!order) return res.status(500);
    res.json(order);
  } catch (error) {
    res.status(500).json("Your cart is empty !");
  }
};

const CheckoutFinal = async (req, res) => {
  try {
    try {
      let Order = new Orderfinal(req.body);
      await Order.save();
      res.status(200).json("Order is ready to payment ! ");
    } catch (error) {
      res.status(400).send("please check sign in or not !");
    }
  } catch (error) {}
};

const PaymentVerification = async (req, res) => {
  const inst = instance.instance;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", inst.key_secret)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await OrdersPayment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(`${process.env.Client_HostName}/paymentsuccess/${razorpay_payment_id}`);
  } else {
    res.redirect(`${process.env.Client_HostName}/paymentfailed`);
  }
};

const paymentSuceessOrders = async (req, res) => {
  try {
    const orderSuccess = await OrdersPayment.find();
    res.status(200).send(orderSuccess);
  } catch (err) {
    res.status(400).send(" internal server Error ! ");
  }
};

module.exports = {
  Checkout,
  PaymentVerification,
  CheckoutFinal,
  paymentSuceessOrders
};
