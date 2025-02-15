const User = require("../models/userModel")
const jwt = require("jsonwebtoken");

const authRequired = async (req, res, next)=> {
    const { authorization } = req.headers;

    if(!authorization) {
        res.status(404).json({err: "Authorization token required"})
    }
    const token = authorization.split(" ")[1];
    
    try {
        await jwt.verify(token, process.env.JWTSECRET, async (err, decodedToken)=> {
            if(err){
                res.status(404).json({err: "Authorization failed"});
            }
            const _id = decodedToken.id;
            req.user = await User.findOne({_id}).select("_id");
            next();
        })
    } catch(err){
        res.status(404).json({err: "Authorization failed"});
    }
}

module.exports = authRequired;