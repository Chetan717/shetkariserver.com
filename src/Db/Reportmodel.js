// const mongoose  = require("mongoose")

// const TicketScheama  = new mongoose.Schema({
//     name:{
// type:String
//     },
//    radioData:{
//         type:[String]
//     },
//     response:{
//         type:[String]
//     }

// })
// const TicketBooked = mongoose.model("TicketData",TicketScheama);

// module.exports = TicketBooked;

const mongoose = require("mongoose");

// report of ct-scan scheama
const ReportScheama = new mongoose.Schema({},{ "strict": false});

const ReportModel = new mongoose.model("ReportsData", ReportScheama);

module.exports = ReportModel;

// report of Xaray scheama
const ReportScheamaXray = new mongoose.Schema({},{ "strict": false});

const ReportModelXray = new mongoose.model("ReportsDataXray", ReportScheamaXray);

module.exports = ReportModelXray;

// report of Sonographyscheama
const ReportScheamaSono = new mongoose.Schema({},{ "strict": false});

const ReportModelSono = new mongoose.model("ReportsDataSono", ReportScheamaSono);

module.exports = ReportModelSono;


// report of mri
const ReportScheamaMri = new mongoose.Schema({},{ "strict": false});

const ReportModelMri = new mongoose.model("ReportsDataMri", ReportScheamaMri);

module.exports = ReportModelMri;