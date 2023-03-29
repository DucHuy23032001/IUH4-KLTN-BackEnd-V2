const MONGOOSE = require('mongoose')
const SCHEMA = MONGOOSE.Schema

let noteSchema = new SCHEMA(
    {
        text: {
            type: String,
            require: [true, "Please fill text of note!"]
        },
        links: [
            {
                link: String
            }
        ],
        thingToDoId: {
            type: SCHEMA.Types.ObjectId,
            default: null,
            require: [true, "Please fill thingToDoId of note!"]
        },
        taskId: {
            type: SCHEMA.Types.ObjectId,
            default: null,
            require: [true, "Please fill taskId of note!"]
        }
    },
    {
        timestamps: true
    }
)

module.exports = MONGOOSE.model("note", noteSchema)