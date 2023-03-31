const MONGOOSE = require('mongoose')
const SCHEMA = MONGOOSE.Schema

// Đổi tên thành = team
let teamSchema = new SCHEMA(
    {
        name: {
            type: String,
            require: [true, "Please fill name of team!"]
        },
        createId: {
            type: SCHEMA.Types.ObjectId,
            require: [true, "Please fill createId of team!"]
        },
        leaderId: {
            type: SCHEMA.Types.ObjectId,
            require: [true, "Please fill leaderId of team!"]
        },
        members: [
            {
                type: SCHEMA.Types.ObjectId,
                require: [true, "Please fill members of team!"]
            }
        ]
        // status: {
        //     type: Boolean,
        //     require: [true, "Please fill status of team!"]
        // }
    },
    {
        timestamps: true
    }
)

module.exports = MONGOOSE.model("team", teamSchema)