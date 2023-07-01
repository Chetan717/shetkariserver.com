const express = require("express");

const router = express.Router();

const {getAllOrders,AddBookedOrders,updateTicketById,deleteTicketById} = require("../controllers/AllOrdersField")
// route for getting booked Orders
router.route("/").get(getAllOrders);

// route for ADD Orders
router.route("/AddTicket").post(AddBookedOrders);

router.route("/UpdateTicket/:id").put(updateTicketById);  // route for update the Orders Orders by id
router.route("/DeleteTicket/:id").delete(deleteTicketById); // route for  the delete Orders by id

module.exports = router;