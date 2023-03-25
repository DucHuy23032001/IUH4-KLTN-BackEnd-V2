const MONGOOSE = require('mongoose');
const SCHEMA = MONGOOSE.Schema;

let accountSchema = new SCHEMA({
    email:{
        type:String,
        unique:true,
        trim:true,
        required:[true,"Please fill your gmail!"]
        // validate:{
        //     validator:validator.isEmail,
        //     message:"Please,check your email!"
        // }
    },
    password:{
        type: String,
        required: [true, "Please fill your password!"],
        minLength: 6,
        select: true,
    }
})

module.exports = MONGOOSE.model("account",accountSchema);