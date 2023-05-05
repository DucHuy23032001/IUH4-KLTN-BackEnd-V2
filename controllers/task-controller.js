const TASK = require('../models/task')
const WORK = require('../models/work')
const USER  = require('../models/user')
const TEAM = require('../models/team')
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
        let work = await WORK.findById(tasks.workId)
        let members = []
        for( f of tasks.members) {
            let user = await USER.findById(f)
            let info = {
                "name": user.fullName,
                "avatar": user.avatar
            }
            members.push(info)
        }
        let data = {
            "_id": tasks._id,
            "name": tasks.name,
            "description": tasks.description,
            "level": tasks.level,
            "startDay": tasks.startDay,
            "endDay": tasks.endDay,
            "startHour": tasks.startHour,
            "endHour": tasks.endHour,
            "imageLink": tasks.imageLink,
            "workId":work.id,
            "workName": work.name,
            "members": members,
            "status": tasks.status,
            "__v": 0
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//done
exports.getTaskByName = async (req, res) => {
    try {
        let name = req.params.name
        let projectId = req.body.projectId
        let datas = []
        let tasks = await TASK.find({
            name: {'$regex': name,$options:'i'}
        })
        for ( i of tasks ) {
            let members = []
            let work = await WORK.findById(i.workId)
            if (work.projectId == projectId ) {
                for ( j of i.members) {
                    let user = await USER.findById(j)
                    let item = {
                        name : user.fullName,
                        avatar : user.avatar
                    }
                    members.push(item)
                }
                let data = {
                    _id: i.id,
                    name: i.name,
                    startDay: i.startDay,
                    endDay: i.endDay,
                    startHour: i.startHour,
                    endHour: i.endHour,
                    workId: i.workId,
                    workName: work.name,
                    members: members,
                    status: i.status,
                    level: i.level,
                    createdAt: i.createdAt,
                    updatedAt: i.updatedAt,
                    __v: i.__v
                }
                datas.push(data)
            }
        }
        return res.status(200).json(datas)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//done
exports.createTask = async (req, res) => {
    try {
        let { name, startDay, endDay, startHour, endHour, workId, members , level, description } = req.body
        let work = await WORK.findById(workId)

        let dateStart = MOMENT(startDay, "MM-DD-YYYY")
        let dateEnd = MOMENT(endDay, "MM-DD-YYYY")

        if (dateStart > dateEnd) {
            return res.status(409).json({
                msg: "Thời gian bắt đầu phải trước thời gian kết thúc"
            })
        }
        if (dateStart < work.startTime) {
            return res.status(409).json({
                msg: "Thời gian bắt đầu work phải phù hợp với thời gian bắt đầu của work"
            })
        }
        if (dateEnd > work.endTime) {
            return res.status(409).json({
                msg: "Thời gian kết thúc work phải phù hợp với thời gian kết thúc của work"
            })
        }

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
        let team = await TEAM.findById(work.teamId)
        for ( i of members) {
            if (!team.listMembers.includes(i)) {
                team.listMembers.push(i)
            }
        }
        team.save()
        return res.status(200).json(task)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//done
exports.updateTask = async (req, res) => {
    try {
        let { name, startDay, endDay, startTime, endTime, userId, description, level, status , members } = req.body
        let id = req.params.id
        let check = true
        let dateStart = MOMENT(startDay, "MM-DD-YYYY")
        let dateEnd = MOMENT(endDay, "MM-DD-YYYY")
        let task = await TASK.findById(id)
        let work = await WORK.findById(task.workId)


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


        if (dateStart > dateEnd) {
            return res.status(409).json({
                msg: "Thời gian bắt đầu phải trước thời gian kết thúc"
            })
        }
        if (dateStart < work.startTime) {
            return res.status(409).json({
                msg: "Thời gian bắt đầu work phải phù hợp với thời gian bắt đầu của work"
            })
        }
        if (dateEnd > work.endTime) {
            return res.status(409).json({
                msg: "Thời gian kết thúc work phải phù hợp với thời gian kết thúc của work"
            })
        }

        task.name = name
        task.startDay = dateStart
        task.endDay = dateEnd
        task.startTime = startTime
        task.endTime = endTime
        task.description = description
        task.level = level
        task.status = status
        task.members = members
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