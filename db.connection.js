require("dotenv").config();
const URI = process.env.MONGODB_URI;
const mongoose = require("mongoose");

mongoose.connect(URI);

mongoose.connection
    .on("open", ()=> console.log("Your are connected to mongoose"))
    .on("close", () => console.log("Your are disconected"))
    .on("error", (error) => console.log(error));