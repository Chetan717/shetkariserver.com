const mongoose  = require("mongoose")

const TicketScheama  = new mongoose.Schema({
    name:{
type:String
    },
   radioData:{
        type:[String]
    },
    response:{
        type:[String]
    }
   



})
const TicketBooked = mongoose.model("TicketData",TicketScheama);

module.exports = TicketBooked;


 