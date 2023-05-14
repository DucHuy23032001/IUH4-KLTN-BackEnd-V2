const MONGOOSE = require('mongoose')
const SCHEMA = MONGOOSE.Schema

let noteSchema = new SCHEMA(
    {
        text: {
            type: String,
            default: "",
            require: [true, "Please fill text of note!"]
        },
        taskId: {
            type: SCHEMA.Types.ObjectId,
            default: null
        },
        workId: {
            type: SCHEMA.Types.ObjectId,
            default: null
        },
        createId: {
            type: SCHEMA.Types.ObjectId,
            require: [true, "Please fill createId of note!"]
        }
    },
    {
        timestamps: true
    }
)

module.exports = MONGOOSE.model("note", noteSchema)