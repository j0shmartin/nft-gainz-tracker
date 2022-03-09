require("dotenv").config();
const URI = process.env.MONGODB_URI;
console.log(URI)
const mongoose = require("mongoose");

mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection
    .on("open", ()=> console.log("Your are connected to mongoose"))
    .on("close", () => console.log("Your are disconected"))
    .on("error", (error) => console.log(error));