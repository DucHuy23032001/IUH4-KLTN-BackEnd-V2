const TASK = require('../models/task')
const WORK = require('../models/work')
const USER  = require('../models/user')
const MOMENT = require('moment')

//done
exports.getAllTaskByIdProject = async (req, res) => {
    try {
        let id = req.params.id
        let data = []
        let works = await WORK.find({
            projectId: id
        })
        for (i of works) {
            let tasks = await TASK.find({
                workId: i._id
            })
            for (j of tasks) {
                let work = await WORK.findById(j.workId)
                let members = []
                for( f of j.members) {
                    let user = await USER.findById(f)
                    let info = {
                        "name": user.fullName,
                        "avatar": user.avatar
                    }
                    members.push(info)
                }
                let item = {
                    "_id": j._id,
                    "name": j.name,
                    "description": j.description,
                    "level": j.level,
                    "startDay": j.startDay,
                    "endDay": j.endDay,
                    "startHour": j.startHour,
                    "endHour": j.endHour,
                    "imageLink": j.imageLink,
                    "workId":work.id,
                    "workName": work.name,
                    "members": members,
                    "status": j.status,
                    "__v": 0
                }
                data.push(item)
            }
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//done
exports.getAllTaskInWork = async (req, res) => {
    try {
        let id = req.params.id
        let tasks = await TASK.find({
            workId: id
        })
        return res.status(200).json(tasks)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//done
exports.getTaskById = async (req, res) => {
    try {
        let id = req.params.id
        let tasks = await TASK.findById(id)
        return res.status(200).json(tasks)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//done
exports.getTaskByName = async (req, res) => {
    try {
        let name = req.params.name
        let task = await TASK.find({
            name: name
        })
        return res.status(200).json(task)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//done
exports.createTask = async (req, res) => {
    try {
        let { name, startDay, endDay, startHour, endHour, workId, members , level, description} = req.body
        let dateStart = MOMENT(startDay, "MM-DD-YYYY")
        let dateEnd = MOMENT(endDay, "MM-DD-YYYY")
        let task = await TASK.create({
            name: name,
            description: description,
            startDay: dateStart,
            endDay: dateEnd,
            startHour: startHour,
            endHour: endHour,
            workId: workId,
            members: members,
            level:level
        })
        return res.status(200).json(task)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//done
exports.updateTask = async (req, res) => {
    try {
        let { name, startDay, endDay, startTime, endTime, userId, description, level } = req.body
        let id = req.params.id
        let check = true
        let dateStart = MOMENT(startDay, "MM-DD-YYYY")
        let dateEnd = MOMENT(endDay, "MM-DD-YYYY")
        let task = await TASK.findById(id)
        for (i of task.members) {
            if (userId == i) {
                check = false
            }
        }
        if (check) {
            return res.status(400).json({
                message: "Only member can edit"
            })
        }

        if (dateEnd - dateStart < 0) {
            return res.status(400).json({
              message:"dateEnd > dateStart"
            })
        }

        task.name = name
        task.startDay = dateStart
        task.endDay = dateEnd
        task.startTime = startTime
        task.endTime = endTime
        task.description = description
        task.level = level
        task.save()
        return res.status(200).json(task)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//done
exports.updateDescription = async (req, res) => {
    try {
        let description = req.body.description
        let id = req.params.id
        let task = await TASK.findById(id)

        task.description = description
        task.save()
        return res.status(200).json(task)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//done
exports.changeName = async (req, res) => {
    try {
        let name = req.body.name
        let id = req.params.id
        await TASK.findByIdAndUpdate(id, {
            name: name
        })
        let task = await TASK.findById(id)
        return res.status(200).json(task)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//done
exports.deleteTask = async (req, res) => {
    try {
        let id = req.params.id
        await TASK.deleteOne({ _id: id });
        return res.status(200).json({
            _id: id,
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

// done
exports.updateStatusTask  = async (req, res) => {
    try {

        let id = req.params.id
        let task = await TASK.findById(id)
        task.status = true
        task.save()
        return res.status(200).json(task)
    } catch (error) {
        return res.status(500).json(error)
    }
}