const MONGOOSE = require('mongoose')
const SCHEMA = MONGOOSE.Schema

let thingSchema = new SCHEMA(
    {
        name: {
            type: String,
            require: [true, "Please fill name of Thing!"]
        },
        status: {
            type: Boolean,
            require: [true, "Please fill status of Thing!"]
        },
        startTime: {
            type: Date,
            require: [true, "Please fill startTime of Thing!"]
        },
        endTime: {
            type: Date,
            require: [true, "Please fill endTime of Thing!"]
        },
        taskId: {
            type: SCHEMA.Types.ObjectId,
            require: [true, "Please fill taskId of Thing!"]
        }
    },
    {
        timestamps: true
    }
)

module.exports = MONGOOSE.model("thingToDo", thingSchema)