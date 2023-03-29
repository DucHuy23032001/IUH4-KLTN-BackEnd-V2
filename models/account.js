const MONGOOSE = require('mongoose');
const SCHEMA = MONGOOSE.Schema;

let accountSchema = new SCHEMA({
    email:{
        //^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$
        type:String,
        // validate: {
        //     validator: function(v) {
        //       return /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/g.test(v)
        //     },
        //     message: props => `${props.value} Không phải là email hợp lệ`
        //   },
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
        minLength: [6,"The passwork >= 6 character"],
        select: true,
    }
})

module.exports = MONGOOSE.model("account",accountSchema);