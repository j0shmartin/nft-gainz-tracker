const express = require('express');
const router = express.Router();
const db = require('../models');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

router.post("/register", async (req,res)=>{
    const user = req.body;
    const takenUsername = await db.User.findOne({username: user.username});
    const takenEmail = await db.User.findOne({username: user.username});
    
    if(takenEmail || takenUsername){
        res.json({message: "Username or email has already been taken"});
    } else {
        const preHashed = req.body.password
        user.password = await bcrypt.hash(req.body.password,10);
        const newUser = new db.User({
            username: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
            password: user.password,
            wallets: []
        })
        console.log(newUser)
        const isMatch = await bcrypt.compare(preHashed,req.body.password)
        newUser.save()
        res.json({message: "Success"})
    }
})

router.post("/login", (req,res)=>{
    console.log(req.body)
    const userLoggingIn = req.body;

    db.User.findOne({username: userLoggingIn.username})
    .then(dbUser => {
        console.log(dbUser)
        if(!dbUser) {
            return res.json({
                message:"Invalid Username or Password"
            })
        }
        bcrypt.compare(userLoggingIn.password, dbUser.password,function(err,isCorrect){
                if(isCorrect) {
                    console.log(isCorrect)
                    const payload = {
                        id:dbUser._id,
                        username:dbUser.username,
                        email:dbUser.email,
                        wallets: dbUser.wallets
                    }
                    jwt.sign(
                        payload,
                        process.env.JWT_KEY,
                        {expiresIn:86400*7},
                        (err,token)=> {
                            if(err) return res.json({message:err});
                            return res.json({
                                message: "Success",
                                token: `Bearer ${token}`
                            });
                        }
                    );
                } else {
                return res.json({
                    message: "Invalid Username or Password"
                });
            }
        });
    });
});

module.exports=router