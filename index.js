const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;
const app = express();
const config = require("./src/Db/Config");
const razorpay = require("razorpay");
const movies_routes = require("./src/routes/movie");
const Ticket_routes = require("./src/routes/Orders");
const User_Route = require("./src/routes/UserAuthRoute");
const Product_Route = require("./src/routes/ProductRoute");
const Ds_Route = require("./src/routes/DsOrder");
const Payment_Route = require("./src/routes/PaymentRoute");
const CustomerOrderRouter = require("./src/routes/CustomerOrderRoute");
const dotenv = require("dotenv");

dotenv.config({ path: "./src/.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.set("strictQuery", true);

// connection server to mongodb Atlas Cloud
const dbUrl = config.dbUrl;

var options = {
  keepAlive: 1,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbUrl, options, (err) => {
  if (err) console.log(err);
});

// Route assign for movie related opration.
app.use("/movies", movies_routes);

// Route assign for Ticket related opration.
app.use("/Ticket", Ticket_routes);

//Routes for user & userAuthentication

app.use("/User", User_Route);

app.use("/Pro", Product_Route);

app.use("/Ds", Ds_Route);

app.use("/Payment", Payment_Route);

app.use("/order", CustomerOrderRouter);

// home route
app.get("/", (req, res) => {
  res.send("hello Devloper welcome  !");
});
app.get("/Payment/apikey", (req, res) => {
  res.status(200).json({ key: `${process.env.RAZORPAY_API_KEY}` });
});

const instance = new razorpay({
  key_id: `${process.env.RAZORPAY_API_KEY}`,
  key_secret: `${process.env.RAZORPAY_SECRETE_KEY}`,
});

module.exports.instance = instance;

app.listen(port); // port configure / app listening on port 4000
