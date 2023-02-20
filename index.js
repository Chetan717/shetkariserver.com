const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose");
const port = process.env.PORT || 4000
const app = express();
const config = require("./src/Db/Config");

const Datamodel = require("./src/Db/UserModel")
const TicketBooked = require("./src/Db/TicketModel")

app.use(express.json())
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




  app.get("/",(req,res)=>{
    res.send("hello Photo grapher!")
  })





  app.post("/login",async(req,res)=>{

    let user = await Datamodel.find(req.body).select("-pass")

    if(user){
        res.send(user)
    }else{
        res.send("user not found")
    }

})


app.post("/register",async(req,res)=>{
    
let userdata = new Datamodel(req.body)
let result = await userdata.save();

let original = result.toObject();

delete original.pass

res.send(original)

})



app.post("/Ticket",async(req,res)=>{
try {
  let TicketData=new TicketBooked(req.body)
  let result = await TicketData.save();
  res.send(result)
} catch (error) {
  console.log(error)
}
})

app.get('/Ticket',async(req,res)=>{
let Ticket = await TicketBooked.find()
res.send(Ticket)
})






app.listen(port)