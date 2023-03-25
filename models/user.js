const MONGOOSE = require('mongoose')
const SCHEMA = MONGOOSE.Schema

const userSchema = new SCHEMA({
    fullName:{
        type:String,
        require:[true,"Please fill your full name!"]
    },
    birthday:{
        type:Date,
        require:[true,"Please fill your birthday"]
    },
    address:{
        type:String,
        require:[true,"Please fill your address"]
    },
    phoneNumber:{
        type:Number,
        require:[true,"Please fill your phone number!"]
    },
    gender:{
        type:Boolean,
        require:[true,"Please fill your gender!"]
    },
    status:{
        type:Boolean,
        require:[true,"Please fill your status!"]
    },
    avatar:{
        type:String,
        require:[true,"Please fill your avatar_image!"]
    },
    accountId:{
        type:SCHEMA.Types.ObjectId,
        require:true
    }
})

module.exports = MONGOOSE.model('user',userSchema)