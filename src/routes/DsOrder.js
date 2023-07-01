const express = require("express");
const router = express.Router();
const {
    getAllDsOrder,
    createDsOrder,
    getDsOrderById,
    updateDsOrderById,
    deleteDsOrderById,
    getOrderByCustomerEmail
} = require("../controllers/DistOrderCon");

// routes for the Product

router.route("/").get(getAllDsOrder); // route for server
router.route("/AddDs").post(createDsOrder); // route for post the data /Ticket/AddTicket
router.route("/:id").get(getDsOrderById); // route for get Ds by its id using /Ds/:id
router.route("/UpdateDs/:id").put(updateDsOrderById); // route for put Ds data /Ticket/UpdateTicket
router.route("/DeleteDs/:id").delete(deleteDsOrderById); // route for delete Product  data /Ticket/deleteTicket
router.route("/email/:email").get(getOrderByCustomerEmail);
module.exports = router;
