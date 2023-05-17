const MONGOOSE = require('mongoose')
const SCHEMA = MONGOOSE.Schema

let partitionTableSchema = new SCHEMA(
    {
        userId: {
            type: SCHEMA.Types.ObjectId,
            require: [true, "Please fill createId of member!"]
        },
        taskId: {
            type: SCHEMA.Types.ObjectId,
            require: [true, "Please fill leaderId of member!"]
        }
    },
    {
        timestamps: true
    }
)

module.exports = MONGOOSE.model("partitionTable", partitionTableSchema)