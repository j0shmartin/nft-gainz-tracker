const jwt = require("jsonwebtoken")

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

module.exports= verifyJWT