const express = require('express');
const router = express.Router();
const db = require('../models');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const verifyJWT = require("../middleware/auth")

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

router.get("/", async (req,res)=>{
    try {
        res.json(await db.User.find({}));
    } catch (error){
        res.status(400).json(error)
        console.log(error)
    }
});


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