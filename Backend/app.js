//external-packages
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const morgan=require("morgan");
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const expressValidator=require("express-validator");
const cors=require("cors");
const app = express();

//twilio_credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

//import ROUTES
const authRoutes=require("./routes/auth");


//---------- CONNECT TO MONGO DB ---------
var mongourl = process.env.MONGO_URL;
async function connectToDB() {
  try {
    await mongoose.connect(mongourl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
}
connectToDB();

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes middleware --all routes will begin with /api
app.use("/api",authRoutes);




//---------- MISC ----------
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend Server is listening on port " + (process.env.PORT || 5000));
});
