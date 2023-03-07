// report of Sonographyscheama
const mongoose = require("mongoose");
const ReportScheamaSono = new mongoose.Schema({},{ "strict": false});

const ReportModelSono = new mongoose.model("ReportsDataSono", ReportScheamaSono);

module.exports = ReportModelSono;