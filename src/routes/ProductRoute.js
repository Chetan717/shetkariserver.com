const express = require("express");
const router = express.Router();
const {
  getAllProduct,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/ProductControl");

// routes for the Product

router.route("/").get(getAllProduct); // route for server
router.route("/AddProduct").post(createProduct); // route for post the data /Ticket/AddTicket
router.route("/:id").get(getProductById); // route for get Product by its id using /Product/:id
router.route("/UpdateProduct/:id").put(updateProductById); // route for put Product data /Ticket/UpdateTicket
router.route("/DeleteProduct/:id").delete(deleteProductById); // route for delete Product  data /Ticket/deleteTicket

module.exports = router;
