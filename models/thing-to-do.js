const MONGOOSE = require('mongoose')
const SCHEMA = MONGOOSE.Schema

let thingSchema = new SCHEMA({
    name:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        require:true
    },
    startTime:{
        type:Date,
        require:true
    },
    endTime:{
        type:Date,
        require:true
    },
    taskId:{
        type:SCHEMA.Types.ObjectId,
        require:true
    }
})

module.exports = MONGOOSE.model("thingToDo",thingSchema)