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




