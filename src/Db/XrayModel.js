// report of Xaray scheama
const mongoose = require("mongoose");
const ReportScheamaXray = new mongoose.Schema({},{ "strict": false});

const ReportModelXray = new mongoose.model("ReportsDataXray", ReportScheamaXray);

module.exports = ReportModelXray;
