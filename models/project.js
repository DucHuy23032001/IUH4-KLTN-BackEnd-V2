const MONGOOSE = require('mongoose')
const SCHEMA = MONGOOSE.Schema

let projectSchema = new SCHEMA(
    {
        name: {
            type: String,
            require: [true, "Please fill your project name!"]
        },
        startTime: {
            type: Date,
            require: [true, "Please fill start day of project!"]
        },
        endTime: {
            type: Date,
            require: [true, "Please fill end time of project!"]
        },
        status: {
            type: Boolean,
            default: false
        },
        background: {
            type: String,
            require: [true, "Please fill your project name!"]
        },
        mainProject:{
            type: SCHEMA.Types.ObjectId,
            require: [true, "Please fill id main project!"]
        }
    },
    {
        timestamps: true
    }
)

module.exports = MONGOOSE.model("project", projectSchema)