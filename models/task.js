const MONGOOSE = require('mongoose')
const SCHEMA = MONGOOSE.Schema

const taskSchema = new SCHEMA(
    {
        name: {
            type: String,
            require: [true, "Please fill task name!"]
        },
        description:{
            type: String,
        },
        startDay: {
            type: Date,
            require: [true, "Please fill start day of task!"]
        },
        endDay: {
            type: Date,
            require: [true, "Please fill end day of task!"]
        },
        startHour: {
            type: String,
            require: [true, "Please fill start Hour of task!"]
        },
        endHour: {
            type: String,
            require: [true, "Please fill end Hour of task!"]
        },
        linkSupports: [
            {
                link: String
            }
        ],
        workId: {
            type: SCHEMA.Types.ObjectId,
            require: [true, "Please fill Word of task!"]
        },
        members: [{
            type: SCHEMA.Types.ObjectId,
            require: [true, "Please fill Members of task!"]
        }],
        status: {
            type: Number,
            default: 3
        },
        level: {
            type: Number,
            enum: {
                values: [1, 2, 3],
                message: '{VALUE} is not supported'
            },
            default: 1
            /// (1,2,3) = (Bình thường, Quan trọng, Khẩn cấp)
        }
    },
    {
        timestamps: true
    }
)

module.exports = MONGOOSE.model("task", taskSchema)