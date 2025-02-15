const User =  require("../models/userModel");
const jwt = require("jsonwebtoken");


// Create Token
const maxage = 60 * 60 * 24
const createToken = (id)=> {
    return jwt.sign({id}, process.env.JWTSECRET)
}

// login controller
const loginUser = async (req, res)=> {
    const { email, password } = req.body;

    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxage * 1000});
        res.header('Authorization', 'Bearer ' + token)
        res.status(200).json({email, token});
    } catch (err) {
        res.status(404).json({err: err.message});
    }
}

// signup controller
const signupUser = async (req, res)=> {
    const { email, password } = req.body

    try{
        const user = await User.signup(email, password);
        const token = createToken(user._id);
        res.cookie("jwt",token , { httpOnly: true, maxAge: maxage * 1000});
        res.header('Authorization', 'Bearer ' + token)
        res.status(200).json({email, token});
    } catch (err) {
        res.status(404).json({err: err.message});
    }
}

module.exports = {
    signupUser,
    loginUser
}