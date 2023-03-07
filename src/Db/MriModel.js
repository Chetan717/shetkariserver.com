
// report of mri
const mongoose = require("mongoose");
const ReportScheamaMri = new mongoose.Schema({},{ "strict": false});

const ReportModelMri = new mongoose.model("ReportsDataMri", ReportScheamaMri);

module.exports = ReportModelMri;