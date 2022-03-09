require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;
const mongoose = require("mongoose");

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection
    .on("open", ()=> console.log("Your are connected to mongoose"))
    .on("close", () => console.log("Your are disconected"))
    .on("error", (error) => console.log(error));