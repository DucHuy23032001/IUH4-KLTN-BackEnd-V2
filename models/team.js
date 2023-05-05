const MONGOOSE = require('mongoose')
const SCHEMA = MONGOOSE.Schema

let teamSchema = new SCHEMA(
    {
        teamName: {
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
        listMembers: [
            {
                type: SCHEMA.Types.ObjectId,
                require: [true, "Please fill listMembers of team!"]
            }
        ],
        listTeams: [
            {
                type: SCHEMA.Types.ObjectId,
                require: [true, "Please fill listTeams of team!"]
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