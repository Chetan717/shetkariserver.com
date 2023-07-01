const ProductModal = require("../modals/ProductModel");

// getting the Product data from the database
const getAllProduct = async (req, res) => {
  let AllProduct = await ProductModal.find();
  res.status(200).send(AllProduct);
};

// to get req from the client and send the data to the database using post metthod
const createProduct = async (req, res) => {
  try {
    // Create a new product instance
    const prod = new ProductModal(req.body);

    // Save the product to the database
    await prod.save();

    res.status(200).send("Product added successfully!");
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Something went wrong while creating the product!");
  }
};

// Validation function using Joi or any other validation library

// get Product data by their id

const getProductById = async (req, res) => {
  try {
    let iddata = await ProductModal.findOne({ _id: req.params.id });
    if (iddata) {
      res.status(200).send(iddata);
    } else {
      res.send("data no found");
    }
  } catch (error) {
    res.status(400).send("no Found");
  }
};

// update movie by getting id
const updateProductById = async (req, res) => {
  try {
    const updatedData = await ProductModal.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (updatedData) {
      res.status(200).send("Product Data updated sucess !");
    } else {
      res.send("something Went Wrong !");
    }
  } catch (error) {
    res.status(400).send("Update failed");
  }
};

// delete movie by getting id

const deleteProductById = async (req, res) => {
  try {
    const deletedData = await ProductModal.findOneAndDelete({
      _id: req.params.id,
    });
    if (deletedData) {
      res.status(200).send("Product Deleted Succesfully !");
    } else {
      res.send("Product Not Found");
    }
  } catch (error) {
    res.status(400).send("Delete failed");
  }
};

module.exports = {
  getAllProduct,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
