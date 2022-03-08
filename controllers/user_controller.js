const express = require('express');
const router = express.Router();
const db = require('../models');

router.get("/", async (req,res)=>{
    try {
        res.json(await db.User.find({}));
    } catch (error){
        res.status(400).json(error)
        console.log(error)
    }
});


router.post("/", async (req,res)=>{
    try {
        res.json(await db.User.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
})

router.get("/:userid", async (req,res)=>{
    try {
        res.json(await db.User.findById(req.params.userid));
    } catch (error){
        res.status(400).json(error)
        console.log(error)
    }
});

router.put("/:userid", async (req,res)=>{
    try {
        res.json(await db.User.findByIdAndUpdate(req.params.userid, req.body));
    } catch (error){
        res.status(400).json(error)
        console.log(error)
    }
});

router.delete("/:userid", async (req,res)=>{
    try {
        res.json(await db.User.findByIdAndDelete(req.params.userid));
    } catch (error){
        res.status(400).json(error)
        console.log(error)
    }
});

module.exports=router;