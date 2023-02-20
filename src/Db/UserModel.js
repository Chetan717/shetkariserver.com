const mongoose  = require("mongoose")

const userSchema  = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    pass:{
        type:String
    }
})
const datamodel = mongoose.model("user",userSchema);

module.exports = datamodel;
