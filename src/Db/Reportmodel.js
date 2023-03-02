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

const ReportScheama = new mongoose.Schema({
  Report: [
    {
      option1: {
        type: String,
      },
      problem1: {
        type: String,
      },
    },
    {
      option: {
        type: String,
      },
      problem: {
        type: String,
      },
    },
    {
      fullname: {
        type: String,
      },
      Age: {
        type: String,
      },
      RefDoctor: {
        type: String,
      },
      date: {
        type: Date,
      },
    },
  ],
});

const ReportModel = new mongoose.model("ReportsData", ReportScheama);

module.exports = ReportModel;
