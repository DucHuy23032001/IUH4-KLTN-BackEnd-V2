const MONGOOSE = require('mongoose')
const SCHEMA = MONGOOSE.Schema

let memberSchema = new SCHEMA(
    {
        number: {
            type: Number,
            require: [true, "Please fill name of member!"]
        },
        userId: {
            type: SCHEMA.Types.ObjectId,
            require: [true, "Please fill createId of member!"]
        },
        teamId: {
            type: SCHEMA.Types.ObjectId,
            require: [true, "Please fill leaderId of member!"]
        }
    },
    {
        timestamps: true
    }
)

module.exports = MONGOOSE.model("member", memberSchema)