const MONGOOSE = require('mongoose')
const SCHEMA = MONGOOSE.Schema

let projectSchema = new SCHEMA({
    name:{
        type:String,
        require:[true,"Please fill your project name!"]
    },
    startTime:{
        type:Date,
        require:[true,"Please fill start day of project!"]
    },
    endTime:{
        type:Date,
        require:[true,"Please fill end time of project!"]
    },
    status:{
        type:Boolean,
        default:false
    },
    background:{
        type:String,
        require:[true,"Please fill your project name!"]
    },
    teamIds:[
        {
            type:SCHEMA.Types.ObjectId,
            require:[true,"Please fill teamId of project!"]
        }
    ]
    // mainProject: {
    //     type: SCHEMA.Types.ObjectId,
    //     require:[true,"Please fill your mainProject!"]
    // }
    
})

module.exports = MONGOOSE.model("project",projectSchema)