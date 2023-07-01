const OrderModal = require("../modals/OrderModal");

// getting the Ticket data from the database
const getAllOrders = async (req, res) => {
  try {
    let AllOrders = await OrderModal.find();
    res.status(200).send(AllOrders);
  } catch (error) {
    res.status(400).send("Getting Order Data Failed !");
  }
};

// to get req of booked Ticket from the client and send the data to the database using post metthod

const AddBookedOrders = async (req, res) => {
  try {
    let Order = new OrderModal(req.body);
    let result = await Order.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send("Order not added");
  }
};

// delete the Orders by using their id
const deleteTicketById = async (req, res) => {
  try {
    const OrderId = req.params.id; // Assuming the ID is passed as a parameter in the request URL
    const result = await OrderModal.findByIdAndDelete(OrderId);

    if (result) {
      res.status(200).send("Order deleted successfully");
    } else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    res.status(500).send("Error occurred while deleting the Order");
  }
};

// update the ticket by using ther id using put

const updateTicketById = async (req, res) => {
  try {
    const OrderId = req.params.id; // Assuming the ID is passed as a parameter in the request URL
    const updatedFields = req.body; // Assuming the updated fields are passed in the request body

    const result = await OrderModal.findByIdAndUpdate(OrderId, updatedFields, {
      new: true,
    });

    if (result) {
      res.status(200).send("succesfully done !");
    } else {
      res.status(404).send("Data not found");
    }
  } catch (error) {
    res.status(500).send("Error occurred while updating the order");
  }
};

module.exports = {
  getAllOrders,
  AddBookedOrders,
  deleteTicketById,
  updateTicketById,
};
