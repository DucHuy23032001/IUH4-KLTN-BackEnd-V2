const WORK = require('../models/work')
const TASK = require('../models/task')
const TEAM = require('../models/team')
const PROJECT = require('../models/project')
const MOMENT = require('moment')

//done
exports.getAllWorkByProjectId = async (req, res) => {
    try {
        let id = req.params.id
        let datas = []
        let works = await WORK.find({
            projectId: id
        })
        for (i of works) {
            let team = await TEAM.findById(i.teamId)
            let nameTeam = []
            if (team != null) {
                nameTeam.push(team.teamName)
                let listTeam = team.listTeams
                for (j of listTeam) {
                    if (j != null) {
                        let itemTeam = await TEAM.findById(j)
                        nameTeam.push(itemTeam.teamName)
                    }
                }
            }

            let data = {
                _id: i._id,
                name: i.name,
                status: i.status,
                startTime: i.startTime,
                endTime: i.endTime,
                teamId: i.teamId,
                createId: i.createId,
                projectId: i.projectId,
                teamName: nameTeam
            }
            datas.push(data)
        }
        return res.status(200).json(datas)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//done
exports.getWorkByName = async (req, res) => {
    try {
        let id = req.params.projectId
        let name = req.body.name
        let works = await WORK.find({
            name: { '$regex': name, $options: 'i' },
            projectId: id
        })
        console.log(works[0]);
        let team = await TEAM.findById(works[0].teamId)
        let data = {
            _id: works[0]._id,
            name: works[0].name,
            status: works[0].status,
            startTime: works[0].startTime,
            endTime: works[0].endTime,
            teamId: works[0].teamId,
            createId: works[0].createId,
            projectId: works[0].projectId,
            teamName: team.teamName
        }
        console.log(data);
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}
//done
exports.getWorkById = async (req, res) => {
    try {
        let id = req.params.id
        let works = await WORK.findById(id)
        let team = await TEAM.findById(works.teamId)
        let data = {
            _id: works._id,
            name: works.name,
            status: works.status,
            startTime: works.startTime,
            endTime: works.endTime,
            teamId: works.teamId,
            createId: works.createId,
            projectId: works.projectId,
            teamName: team.teamName
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}
//done
exports.createWork = async (req, res) => {
    try {
        let { name, projectId, startTime, endTime, createId, teamId, leaderId } = req.body
        let start = MOMENT(startTime, "MM-DD-YYYY")
        let end = MOMENT(endTime, "MM-DD-YYYY")

        let project = await PROJECT.findById(projectId)
        if (start > end) {
            return res.status(409).json({
                msg: "Thời gian bắt đầu phải trước thời gian kết thúc"
            })
        }
        if (start < project.startTime) {
            return res.status(409).json({
                msg: "Thời gian bắt đầu work phải phù hợp với thời gian bắt đầu của project"
            })
        }
        if (end > project.endTime) {
            return res.status(409).json({
                msg: "Thời gian kết thúc work phải phù hợp với thời gian kết thúc của project"
            })
        }

        let work = await WORK.create({
            teamId: teamId,
            status: false,
            createId: createId,
            name: name,
            leaderId: leaderId,
            projectId: projectId,
            startTime: start,
            endTime: end
        })
        return res.status(200).json(work)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//done
exports.updateWork = async (req, res) => {
    try {
        let id = req.params.id
        let { name, startTime, endTime, teamId, leaderId } = req.body

        let work = await WORK.findById(id)
        let project = await PROJECT.findById(work.projectId)

        let start = MOMENT(startTime, "MM-DD-YYYY")
        let end = MOMENT(endTime, "MM-DD-YYYY")

        if (start > end) {
            return res.status(409).json({
                msg: "Thời gian bắt đầu phải trước thời gian kết thúc"
            })
        }
        if (start < project.startTime) {
            return res.status(409).json({
                msg: "Thời gian bắt đầu work phải phù hợp với thời gian bắt đầu của project"
            })
        }
        if (end > project.endTime) {
            return res.status(409).json({
                msg: "Thời gian kết thúc work phải phù hợp với thời gian kết thúc của project"
            })
        }
        work.name = name
        work.startTime = start
        work.endTime = end
        work.teamId = teamId
        work.leaderId = leaderId
        work.save()
        return res.status(200).json(work)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//done
exports.updateTimeWork = async (req, res) => {
    try {
        let { createId, startTime, endTime, } = req.body
        let id = req.params.id
        let start = MOMENT(startTime, "MM-DD-YYYY")
        let end = MOMENT(endTime, "MM-DD-YYYY")

        let work = await WORK.findById(id)
        let project = await PROJECT.findById(work.projectId)
        if (start > end) {
            return res.status(409).json({
                msg: "Thời gian bắt đầu phải trước thời gian kết thúc"
            })
        }
        if (start < project.startTime) {
            return res.status(409).json({
                msg: "Thời gian bắt đầu work phải phù hợp với thời gian bắt đầu của project"
            })
        }
        if (end > project.endTime) {
            return res.status(409).json({
                msg: "Thời gian kết thúc work phải phù hợp với thời gian kết thúc của project"
            })
        }

        if (work.createId != createId) {
            return res.status(400).json({
                message: "Only the project owner can edit"
            })
        }

        work.startTime = start;
        work.endTime = end;
        work.save()
        return res.status(200).json(work)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//done
exports.changeNameWork = async (req, res) => {
    try {
        let { createId, name } = req.body
        let id = req.params.id

        let work = await WORK.findById(id)
        if (work.createId != createId) {
            return res.status(400).json({
                message: "Only the project owner can edit"
            })
        }

        work.name = name;
        work.save()
        return res.status(200).json(work)
    } catch (error) {
        return res.status(500).json(error)
    }
}

// done
exports.changeStatusWork = async (req, res) => {
    try {
        let createId = req.body.createId
        let id = req.params.id

        let work = await WORK.findById(id)
        if (work.createId != createId) {
            return res.status(400).json({
                message: "Only the project owner can edit"
            })
        }

        await TASK.updateMany({ status: true }, { $set: { workId: id } });
        work.status = true
        work.save()
        return res.status(200).json(work)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//done 
exports.removeWork = async (req, res) => {
    try {
        let id = req.params.id
        await WORK.deleteOne({ _id: id });
        await TASK.deleteMany({ workId: id });
        return res.status(200).json({
            _id: id
        })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}