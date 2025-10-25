const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

const authRequired = async (req, res, next)=> {
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).json({ error: "Authorization required" });
    }

    try {
        // Verify token
        const token = authorization.split(" ")[1];
        const { _id } = jwt.verify(token, secret);
        // Find user on every request and attach the user { _id } to it
        req.user = await User.findOne({ _id }).select("_id");
        next();
    } catch (error) {
        res.status(401).json({ error: "Request is not authorized" });
    }


}

module.exports = authRequired;