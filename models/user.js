const MONGOOSE = require('mongoose')
const SCHEMA = MONGOOSE.Schema

const userSchema = new SCHEMA(
    {
        fullName: {
            type: String,
            require: [true, "Please fill your full name!"]
        },
        birthday: {
            type: Date,
            require: [true, "Please fill your birthday"]
        },
        address: {
            type: String,
            require: [true, "Please fill your address"]
        },
        phoneNumber: {
            type: String,
            validate: {
              validator: function(v) {
                return /((09|03|07|08|05)+([0-9]{8})\b)/g.test(v)
              },
              message: props => `${props.value} không phải là số điện thoại hợp lệ`
            },
            required: [true, 'Please fill your phoneNumber'],
            unique: true
        },
        gender: {
            type: Boolean,
            require: [true, "Please fill your gender!"]
        },
        status: {
            type: Boolean,
            require: [true, "Please fill your status!"]
        },
        avatar: {
            type: String,
            require: [true, "Please fill your avatarImage!"]
        },
        accountId: {
            type: SCHEMA.Types.ObjectId,
            require: [true, "Please fill your accountId!"],
            unique: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = MONGOOSE.model('user', userSchema)