const mongoose = require("mongoose");
const { isEmail, isStrongPassword } = require("validator")
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "please enter a password"],
        minlength: [6, "Password must be more than 6 characters"]
    }
})

userSchema.statics.signup = async function (email, password) {
    const userExixsts = await this.findOne({ email });

    if(userExixsts){
        throw Error("Email already in use");
    }
    if(!email || !password){
        throw Error("Please fill all fields")
    }

    if(!isEmail(email)){
        throw Error("Enter a valid email")
    }

    if(!isStrongPassword(password)){
        throw Error("Enter a strong password")
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash });

    return user;

}

// Login Static method
userSchema.statics.login = async function (email, password){

    if(!email || !password){
        throw Error("Please fill all fields")
    }

    if(!isEmail(email)){
        throw Error("Enter a valid email")
    }
    
const user = await this.findOne({ email });

    if(user){
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid){
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email");

}

const User = mongoose.model("user", userSchema);
module.exports = User;