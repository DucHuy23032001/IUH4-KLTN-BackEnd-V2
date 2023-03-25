const MONGOOSE = require('mongoose')
const SCHEMA = MONGOOSE.Schema

let workSchema = new SCHEMA({
    name: {
        type: String,
    },
    status:{
        type:Boolean,
        default:false
    },
    startTime:{
        type: Date,
        default: Date.now()
    },
    endTime:{
        type: Date,
        require:[true,"Please fill endTime of work!"]
    },
    teamId: {
        type: SCHEMA.Types.ObjectId,
        require:[true,"Please fill teamId of work!"]
    },
    createId:{
        type: SCHEMA.Types.ObjectId,
        require:[true,"Please fill createId of work!"]
    },
    projectId:
    {
        type: SCHEMA.Types.ObjectId,
        require:[true,"Please fill projectId of work!"]
    }

})

module.exports = MONGOOSE.model("work", workSchema)