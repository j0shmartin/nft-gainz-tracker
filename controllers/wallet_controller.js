const express = require('express');
const router = express.Router({mergeParams:true});
const db = require('../models');

router.get("/", async (req,res)=>{
    try {
        foundUser = await db.User.findById(req.params.userid).populate("wallets")
        res.json(foundUser.wallets);
    } catch (error){
        res.status(400).json(error)
        console.log(error)
    }
});

router.get("/:walletid", async (req,res)=>{
    try {
        foundWallet = await db.Wallet.findById(req.params.walletid)
        res.json(foundWallet);
    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports=router;