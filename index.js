const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;
const app = express();
const config = require("./src/Db/Config");

const Datamodel = require("./src/Db/UserModel");

const ReportModel = require("./src/Db/Reportmodel");
const ReportModelXray = require("./src/Db/XrayModel");
const ReportModelSono = require("./src/Db/Sonomodel");
const ReportModelMri = require("./src/Db/MriModel");

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

app.post("/login", async (req, res) => {
  let user = await Datamodel.find(req.body).select("-pass");

  if (user) {
    res.send(user);
  } else {
    res.send("user not found");
  }
});

app.post("/register", async (req, res) => {
  let userdata = new Datamodel(req.body);
  let result = await userdata.save();

  let original = result.toObject();

  delete original.pass;

  res.send(original);
});













app.post("/ReportCt", async (req, res) => {
  try {
    let TicketData = new ReportModel(req.body);
    let result = await TicketData.save();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.get("/ReportCt", async (req, res) => {
  let Ticket = await ReportModel.find();
  res.send(Ticket);
});

app.get("/ReportCt/:id", async (req, res) => {
  let iddata = await ReportModel.findOne({ _id: req.params.id });
  if (iddata) {
    res.send(iddata);
  } else {
    res.send("data no found");
  }
});

app.delete("/ReportCt/:id", async (req, res) => {
  let deletedata = await ReportModel.deleteOne({ _id: req.params.id });
  res.send(deletedata);
});












app.post("/ReportXray", async (req, res) => {
  try {
    let TicketData = new ReportModelXray(req.body);
    let result = await TicketData.save();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.get("/ReportXray", async (req, res) => {
  let Ticket = await ReportModelXray.find();
  res.send(Ticket);
});

app.get("/ReportXray/:id", async (req, res) => {
  let iddata = await ReportModelXray.findOne({ _id: req.params.id });
  if (iddata) {
    res.send(iddata);
  } else {
    res.send("data no found");
  }
});

app.delete("/ReportXray/:id", async (req, res) => {
  let deletedata = await ReportModelXray.deleteOne({ _id: req.params.id });
  res.send(deletedata);
});












app.post("/ReportSono", async (req, res) => {
  try {
    let TicketData = new ReportModelSono(req.body);
    let result = await TicketData.save();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.get("/ReportSono", async (req, res) => {
  let Ticket = await ReportModelSono.find();
  res.send(Ticket);
});

app.get("/ReportSono/:id", async (req, res) => {
  let iddata = await ReportModelSono.findOne({ _id: req.params.id });
  if (iddata) {
    res.send(iddata);
  } else {
    res.send("data no found");
  }
});

app.delete("/ReportSono/:id", async (req, res) => {
  let deletedata = await ReportModelSono.deleteOne({ _id: req.params.id });
  res.send(deletedata);
});













app.post("/ReportMri", async (req, res) => {
  try {
    let TicketData = new ReportModelMri(req.body);
    let result = await TicketData.save();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.get("/ReportMri", async (req, res) => {
  let Ticket = await ReportModelMri.find();
  res.send(Ticket);
});

app.get("/ReportMri/:id", async (req, res) => {
  let iddata = await ReportModelMri.findOne({ _id: req.params.id });
  if (iddata) {
    res.send(iddata);
  } else {
    res.send("data no found");
  }
});

app.delete("/ReportMri/:id", async (req, res) => {
  let deletedata = await ReportModelMri.deleteOne({ _id: req.params.id });
  res.send(deletedata);
});

app.listen(port);
