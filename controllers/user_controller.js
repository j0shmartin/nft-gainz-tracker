const express = require('express');
const router = express.Router();
const db = require('../models');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

router.get("/", async (req,res)=>{
    try {
        res.json(await db.User.find({}));
    } catch (error){
        res.status(400).json(error)
        console.log(error)
    }
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

const verifyJWT = (req,res,next)=>{
    const token = req.headers["x-access-token"]?.split(' ')[1]

    if(token){
        jwt.verify(token,process.env.JWT_KEY,(err, decoded)=>{
            if(err) return res.json({
                isLoggedIn: false,
                message: "Failed to Authenticate"
            });
            req.user = {}
            req.user.id = decoded.id
            req.user.username = decoded.username
            req.user.email = decoded.email
            req.user.wallets = decoded.wallets
            next()
        })
    } else {
        res.json({message: "Wrong Token Gangsta...", isLoggedIn: false})
    }
}

router.get("/isAuth",verifyJWT, (req,res)=>{
    res.json({isAuth:true, username:req.user.username})
})


router.get("/:username",verifyJWT, async (req,res)=>{
    try {
        res.json(await db.User.findOne({username: req.params.username}));
    } catch (error){
        res.status(400).json(error);
        console.log(error);
    }
});

router.put("/:userid",verifyJWT, async (req,res)=>{
    try {
        res.json(await db.User.findByIdAndUpdate(req.params.userid, req.body));
    } catch (error){
        res.status(400).json(error);
        console.log(error);
    }
});

router.delete("/:userid",verifyJWT, async (req,res)=>{
    try {
        res.json(await db.User.findByIdAndDelete(req.params.userid));
    } catch (error){
        res.status(400).json(error);
        console.log(error);
    }
});

module.exports=router;