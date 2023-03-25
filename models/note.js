const MONGOOSE = require('mongoose')
const SCHEMA = MONGOOSE.Schema

let noteSchema = new SCHEMA({
    text:{
        type:String,
    },
    links:[
        {
            link:String
        }
    ],
    thingToDoId:{
        type:SCHEMA.Types.ObjectId,
        require:true
    },
    taskId:{
        type:SCHEMA.Types.ObjectId,
        require:true
    }
})

module.exports = MONGOOSE.model("note",noteSchema)