const express = require("express");
const app = express();

const db = require('./models/index')
const controllers = require('./controllers')

const PORT = process.env.PORT
const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


app.use('/users',controllers.User)

app.use('/users/:userid/wallets',controllers.Wallet)


app.get("/", (req,res)=>{
    res.send("hello world");
});



app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));