const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;
const app = express();
const config = require("./src/Db/Config");
const FarmBlog = require("./src/Db/FarmBlog")

app.use(express.json());
app.use(cors());

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

app.get("/", (req, res) => {
  res.send("hello Photo grapher!");
});









app.post("/FarmBlog", async (req, res) => {
  try {
    let FarmBlogpt = new FarmBlog(req.body);
    let result = await FarmBlogpt.save();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});


app.get("/FarmBlog", async (req, res) => {
  let FarmBlogget = await FarmBlog.find();
  res.send(FarmBlogget);
});


// app.get("FarmBlog/:id?", function (req, res) {
//   //Pagination For number Of receords on page
//   if (req.params.id) {
//       //Case For Counting Number OF Users
//       FarmBlog.find({})
//       .count()
//       .then(data => {
//           res.status(200).send({
//               "cnt" : data
//           })
//       })
//       .catch(err => {
//          res.status(400).send({
//              "err" : err
//          })
//       })
//   }
// })

// router.post("/FarmBlog",function(req,res){
//   const pagination = req.body.pagination ? parseInt(req.body.pagination) : 10;
//   //PageNumber From which Page to Start 
//   const pageNumber = req.body.page ? parseInt(req.body.page) : 1;
//   userss.find({})
//       //skip takes argument to skip number of entries 
//       .sort({"id" : 1})
//       .skip((pageNumber - 1) * pagination)
//       //limit is number of Records we want to display
//       .limit(pagination)
//       .then(data => {
//           res.status(200).send({
//               "users": data
//           })
//       })
//       .catch(err => {
//           res.status(400).send({
//               "err": err
//           })
//       })
// })









app.get("/FarmBlog/:id", async (req, res) => {
  let iddata = await FarmBlog.findOne({ _id: req.params.id });
  if (iddata) {
    res.send(iddata);
  } else {
    res.send("data no found");
  }
});

app.delete("/FarmBlog/:id", async (req, res) => {
  let deletedata = await FarmBlog.deleteOne({ _id: req.params.id });
  res.send(deletedata);
});













app.listen(port);
