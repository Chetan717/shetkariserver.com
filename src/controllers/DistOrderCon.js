const DistrubutorModal = require("../modals/DistrubutorModal");

// getting the Product data from the database
const getAllDsOrder = async (req, res) => {
  let AllDsOrder = await DistrubutorModal.find();
  res.status(200).send(AllDsOrder);
};

// to get req from the client and send the data to the database using post metthod
const createDsOrder = async (req, res) => {
  try {
    let order = new DistrubutorModal(req.body);
    let result = await order.save();
    res.status(200).send("Order Added Successfuly !");
  } catch (error) {
    res.status(400).send("Something Went Wrong !");
  }
};

// get DsOrder data by their id

const getDsOrderById = async (req, res) => {
  try {
    let iddata = await DistrubutorModal.findOne({ _id: req.params.id });
    if (iddata) {
      res.status(200).send(iddata);
    } else {
      res.send("data no found");
    }
  } catch (error) {
    res.status(500).send("no Found");
  }
};

const getOrderByCustomerEmail = async (req, res) => {
  try {
    const orderDataByEmail = await DistrubutorModal.find({
      email: req.params.email,
    });
    res.json(orderDataByEmail); // Send the order data as a JSON response
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" }); // Handle the error appropriately
  }
};

// update movie by getting id
const updateDsOrderById = async (req, res) => {
  try {
    const updatedData = await DistrubutorModal.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (updatedData) {
      res.status(200).send(" Staus update success !");
    } else {
      res.send("something Went Wrong !");
    }
  } catch (error) {
    res.status(400).send("Update failed");
  }
};

// delete movie by getting id

const deleteDsOrderById = async (req, res) => {
  try {
    const deletedData = await DistrubutorModal.findOneAndDelete({
      _id: req.params.id,
    });
    if (deletedData) {
      res.status(200).send("DsOrder Deleted Succesfully !");
    } else {
      res.send("DsOrder Not Found");
    }
  } catch (error) {
    res.status(400).send("Delete failed");
  }
};

module.exports = {
  getAllDsOrder,
  createDsOrder,
  getDsOrderById,
  updateDsOrderById,
  deleteDsOrderById,
  getOrderByCustomerEmail,
};
