const MONGOOSE = require('mongoose')
const SCHEMA = MONGOOSE.Schema

let teamSchema = new SCHEMA(
    {
        teamName: {
            type: String,
            require: [true, "Please fill name of team!"]
        },
        projectId: {
            type: SCHEMA.Types.ObjectId,
            require: [true, "Please fill leaderId of team!"]
        },
        createId: {
            type: SCHEMA.Types.ObjectId,
            require: [true, "Please fill leaderId of team!"]
        }
    },
    {
        timestamps: true
    }
)

module.exports = MONGOOSE.model("team", teamSchema)