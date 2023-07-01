const express = require("express");

const Router = express.Router();

const {
  getAllOrders,
  getOrderById,
  updateOrderById,
  DeleteOrderById,
  getOrderByCustomerEmail,
  getAllOrdersPaymentPaid,
  getAllOrdersPaymentTryToBuy,
} = require("../controllers/CustomerOrder");

Router.route("/").get(getAllOrders);
Router.route("/paid").get(getAllOrdersPaymentPaid);
Router.route("/unpaid").get(getAllOrdersPaymentTryToBuy);
Router.route("/:id").get(getOrderById);
Router.route("/:id").put(updateOrderById);
Router.route("/:id").delete(DeleteOrderById);
Router.route("/email/:email").get(getOrderByCustomerEmail);
module.exports = Router;
