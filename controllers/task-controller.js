const TASK = require('../models/task')
const WORK = require('../models/work')
const USER = require('../models/user')
const TEAM = require('../models/team')
const MEMBER = require('../models/member')
const PARTITIONTABLE = require('../models/partitionTable')
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
            for (t of tasks) {
                let members = []
                let work = await WORK.findById(j.workId)
                let partitions = await PARTITIONTABLE.find({
                    taskId: t.id
                })
                for (p of partitions) {
                    let user = await USER.findById(p.userId)
                    let info = {
                        _id: user.id,
                        name: user.fullName,
                        avatar: user.avatar
                    }
                    members.push(info)
                }
                let item = {
                    _id: tasks._id,
                    name: tasks.name,
                    description: tasks.description,
                    level: tasks.level,
                    startDay: tasks.startDay,
                    endDay: tasks.endDay,
                    startHour: tasks.startHour,
                    endHour: tasks.endHour,
                    imageLink: tasks.imageLink,
                    workId: work.id,
                    workName: work.name,
                    members: members,
                    status: tasks.status,
                    __v: 0
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
        let datas = []
        let work = await WORK.findById(id)
        let tasks = await TASK.find({
            workId: id
        })
        for (j of tasks) {
            let members = []
            let partitions = await PARTITIONTABLE.find({
                taskId: j.id
            })
            for (p of partitions) {
                let user = await USER.findById(p.userId)
                let info = {
                    _id: user.id,
                    name: user.fullName,
                    avatar: user.avatar
                }
                members.push(info)
            }
            let item = {
                _id: tasks._id,
                name: tasks.name,
                description: tasks.description,
                level: tasks.level,
                startDay: tasks.startDay,
                endDay: tasks.endDay,
                startHour: tasks.startHour,
                endHour: tasks.endHour,
                imageLink: tasks.imageLink,
                workId: work.id,
                workName: work.name,
                members: members,
                status: tasks.status,
                __v: 0
            }
            datas.push(item)
        }
        return res.status(200).json(datas)
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
        let partitions = await PARTITIONTABLE.find({
            taskId: id
        })
        for (p of partitions) {
            let user = await USER.findById(p.userId)
            let info = {
                _id: user.id,
                name: user.fullName,
                avatar: user.avatar
            }
            members.push(info)
        }
        let data = {
            _id: tasks._id,
            name: tasks.name,
            description: tasks.description,
            level: tasks.level,
            startDay: tasks.startDay,
            endDay: tasks.endDay,
            startHour: tasks.startHour,
            endHour: tasks.endHour,
            imageLink: tasks.imageLink,
            workId: work.id,
            workName: work.name,
            members: members,
            status: tasks.status,
            __v: 0
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}
//done
exports.getTaskByName = async (req, res) => {
    try {
        let projectId = req.params.projectId
        let name = req.params.name.toLowerCase()
        let datas = []
        let allTask = []

        let works = await WORK.find({
            projectId: projectId
        })

        for (w of works) {
            let tasks = await TASK.find({
                workId: w.id
            })
            for (t of tasks) {
                allTask.push(t)
            }
        }

        for (i of allTask) {
            if (i.name.toLowerCase().includes(name)) {
                let members = []
                let partitions = await PARTITIONTABLE.find({
                    taskId: id
                })
                for (p of partitions) {
                    let user = await USER.findById(p.userId)
                    let info = {
                        _id: user.id,
                        name: user.fullName,
                        avatar: user.avatar
                    }
                    members.push(info)
                }
                let work = await WORK.findById(i.workId)
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
        let { name, startDay, endDay, startHour, endHour, workId, members, level, description } = req.body

        let dateStart = MOMENT(startDay, "MM-DD-YYYY")
        let dateEnd = MOMENT(endDay, "MM-DD-YYYY")

        if (dateStart > dateEnd) {
            return res.status(409).json({
                msg: "Thời gian bắt đầu phải trước thời gian kết thúc"
            })
        }

        let work = await WORK.findById(workId)

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
            level: level
        })

        let memberOfTeam = await MEMBER.find({
            teamId: work.teamId
        })

        console.log(members.length);
        if (members.length > 0) {
            for (m of members) {
                await PARTITIONTABLE.create({
                    userId: m,
                    taskId: task.id
                })
                for (mOT of memberOfTeam) {
                    if (m != mOT.userId) {
                        await MEMBER.create({
                            userId: m,
                            teamId: mOT.teamId,
                            number: 1
                        })
                    }
                }
            }
        }
        let data = {
            _id: task.id,
            name: name,
            description: description,
            startDay: dateStart,
            endDay: dateEnd,
            startHour: startHour,
            endHour: endHour,
            members: members,
            level: level,
            status: task.status,
            workId: workId
        }
        console.log(data);
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}
//done
exports.updateTask = async (req, res) => {
    try {

        let { name, startDay, endDay, startHour, endHour, description, level, status, members } = req.body
        let id = req.params.id
        let dateStart = MOMENT(startDay, "MM-DD-YYYY")
        let dateEnd = MOMENT(endDay, "MM-DD-YYYY")
        let task = await TASK.findById(id)
        let work = await WORK.findById(task.workId)

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

        let memberOfTeam = await MEMBER.find({
            teamId: work.teamId
        })
        let partitions = await PARTITIONTABLE.find({
            taskId: id
        })

        for (m of members) {
            for (p of partitions) {
                if (p.userId != m) {
                    await PARTITIONTABLE.create({
                        userId: m,
                        taskId: id
                    })
                }
            }
            for (mOT of memberOfTeam) {
                if (m != mOT.userId) {
                    await MEMBER.create({
                        userId: m,
                        teamId: mOT.teamId,
                        number: 1
                    })
                }
            }
        }

        let partitions2 = await PARTITIONTABLE.find({
            taskId: id
        })
        let membersRes = []
        for (p of partitions2) {
            membersRes.push(p.userId)
        }

        task.name = name
        task.startDay = dateStart
        task.endDay = dateEnd
        task.startHour = startHour
        task.endHour = endHour
        task.description = description
        task.level = level
        task.status = status
        task.save()

        let data = {
            name: task.name,
            description: task.description,
            startDay: task.dateStart,
            endDay: task.dateEnd,
            members: membersRes,
            startHour: task.startHour,
            endHour: task.endHour,
            level: task.level
        }
        return res.status(200).json(data)
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

        let partitions = await PARTITIONTABLE.find({
            taskId: id
        })
        let membersRes = []
        for (p of partitions) {
            membersRes.push(p.userId)
        }

        let data = {
            name: task.name,
            description: task.description,
            startDay: task.dateStart,
            endDay: task.dateEnd,
            members: membersRes,
            startHour: task.startHour,
            endHour: task.endHour,
            level: task.level
        }

        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}
//done
exports.changeName = async (req, res) => {
    try {
        let name = req.body.name
        let id = req.params.id
        let task = await TASK.findById(id)
        task.name = name
        task.save()

        let partitions = await PARTITIONTABLE.find({
            taskId: id
        })
        let membersRes = []
        for (p of partitions) {
            membersRes.push(p.userId)
        }

        let data = {
            name: task.name,
            description: task.description,
            startDay: task.dateStart,
            endDay: task.dateEnd,
            members: membersRes,
            startHour: task.startHour,
            endHour: task.endHour,
            level: task.level
        }

        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}
//done
exports.removeTask = async (req, res) => {
    try {
        let id = req.params.id
        await TASK.deleteOne({ _id: id });
        await PARTITIONTABLE.deleteMany({ taskId: id });
        return res.status(200).json({
            _id: id,
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}
// done
exports.updateStatusTask = async (req, res) => {
    try {

        let id = req.params.id
        let task = await TASK.findById(id)
        task.status = true
        task.save()

        let partitions = await PARTITIONTABLE.find({
            taskId: id
        })
        let membersRes = []
        for (p of partitions) {
            membersRes.push(p.userId)
        }

        let data = {
            name: task.name,
            description: task.description,
            startDay: task.dateStart,
            endDay: task.dateEnd,
            members: membersRes,
            startHour: task.startHour,
            endHour: task.endHour,
            level: task.level
        }

        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

/////////////// chưa có router

//done
exports.removeMember = async (req, res) => {
    try {

        let { member } = req.body
        let id = req.params.id
        let task = await TASK.findById(id)
        await PARTITIONTABLE.deleteOne({
            userId: member,
            taskId: id
        })
        let partitions2 = await PARTITIONTABLE.find({
            taskId: id
        })
        let membersRes = []
        for (p of partitions2) {
            membersRes.push(p.userId)
        }

        let data = {
            name: task.name,
            description: task.description,
            startDay: task.dateStart,
            endDay: task.dateEnd,
            members: membersRes,
            startHour: task.startHour,
            endHour: task.endHour,
            level: task.level
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//done
exports.addMember = async (req, res) => {
    try {

        let { member } = req.body
        let id = req.params.id
        let task = await TASK.findById(id)
        await PARTITIONTABLE.create({
            userId: member,
            taskId: id
        })
        let partitions2 = await PARTITIONTABLE.find({
            taskId: id
        })
        let membersRes = []
        for (p of partitions2) {
            membersRes.push(p.userId)
        }

        let data = {
            name: task.name,
            description: task.description,
            startDay: task.dateStart,
            endDay: task.dateEnd,
            members: membersRes,
            startHour: task.startHour,
            endHour: task.endHour,
            level: task.level
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}