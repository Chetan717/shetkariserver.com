const Order = require("../modals/OrderProModel");
const dotenv = require("dotenv");

dotenv.config({ path: "../../src/.env" });

const getAllOrders = async (req, res) => {
  try {
    const Data = await Order.find();

    res.status(200).send(Data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const getAllOrdersPaymentPaid = async (req, res) => {
  try {
    const Data = await Order.find();
    const response = await fetch(`${process.env.HostName}/Payment/paySuc`);
    const dataOfPayments = await response.json();

    const confirmedPaymentData = Data.filter((item) =>
      dataOfPayments.map((id) => id.razorpay_order_id).includes(item.orderid)
    );

    res.status(200).send(confirmedPaymentData);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const getAllOrdersPaymentTryToBuy = async (req, res) => {
  try {
    const Data = await Order.find();
    const response = await fetch(`${process.env.HostName}/Payment/paySuc`);
    const dataOfPayments = await response.json();

    const tryToBuyPaymentData = Data.filter((item) =>
      dataOfPayments.map((id) => id.razorpay_order_id).includes(!item.orderid)
    );

    res.status(200).send(tryToBuyPaymentData);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const getOrderById = async (req, res) => {
  try {
    let iddata = await Order.findOne({ _id: req.params.id });
    if (iddata) {
      res.status(200).send(iddata);
    } else {
      res.send("data no found");
    }
  } catch (error) {
    res.status(400).send("no Found");
  }
};

const updateOrderById = async (req, res) => {
  try {
    const updatedData = await Order.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (updatedData) {
      res.status(200).send("Order is updated!");
    } else {
      res.send("Order not found!");
    }
  } catch (error) {
    res.status(400).send("Update failed");
  }
};

// const updateProductById = async (req, res) => {};

const getOrderByCustomerEmail = async (req, res) => {
  try {
    const orderDataByEmail = await Order.find({
      "customer.email": req.params.email,
    });

    const response = await fetch(`${process.env.HostName}/Payment/paySuc`);
    const dataOfPayments = await response.json();

    const confirmedPaymentData = orderDataByEmail.filter((item) =>
      dataOfPayments.map((id) => id.razorpay_order_id).includes(item.orderid)
    );

    res.status(200).send(confirmedPaymentData);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

const DeleteOrderById = async (req, res) => {
  try {
    const deletedData = await Order.findOneAndDelete({
      _id: req.params.id,
    });
    if (deletedData) {
      res.status(200).send("Order Deleted Succesfully !");
    } else {
      res.send("Order Not Found !");
    }
  } catch (error) {
    res.status(400).send(" Order Delete failed ! ");
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  updateOrderById,
  DeleteOrderById,
  getOrderByCustomerEmail,
  getAllOrdersPaymentPaid,
  getAllOrdersPaymentTryToBuy,
};
