const express = require("express");
const app = express();
require("dotenv").config();

const db = require('./models/index');
const controllers = require('./controllers');

const session = require("express-session");
const MongoStore = require("connect-mongo");

const PORT = process.env.PORT
const cors = require("cors");
const morgan = require("morgan");
const corsOptions = {
  origin: 'http://localhost:3000/',
  optionsSuccessStatus: 200
}

// app.use (
//     session({
//         store: MongoStore.create({uri:process.env.MONGODB_URI})
//     })
// )

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000/"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/users',controllers.User)
app.use('/auth',controllers.Auth)


app.use('/users/:userid/wallets',controllers.Wallet)


app.get("/", (req,res)=>{
    res.send("hello world");
});



app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));