const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    phone: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },
});

// Hash password before saving
userSchema.pre("save", async function () {

    // Hash only if the password is modified
    if (!this.isModified("password")) {
        return;
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw error;
    }

});

// Generate JWT Token
userSchema.methods.generateToken = async function(){
    try{
        return jwt.sign(
            {
                //payload
                userId:this._id.toString(),
                email:this.email,
                isAdmin: this.isAdmin,
            },
            //Signature
            process.env.JWT_SECRET_KEY,

            {
                expiresIn:"30d",
            }
        );
    }
    catch(error){
        console.log(error);
    }
}

// Custom Compare Password Function
userSchema.methods.comparePassword = async function (password) {

    return bcrypt.compare(password, this.password);

};

const User = mongoose.model("User", userSchema);

module.exports = User;