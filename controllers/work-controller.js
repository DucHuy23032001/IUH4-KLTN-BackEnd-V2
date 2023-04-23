const WORK = require('../models/work')
const TASK = require('../models/task')
const TEAM = require('../models/team')
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
            if(team != null){
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
        let name = req.params.name
        let works = await WORK.find({
            name: name
        })
        return res.status(200).json(works)
    } catch (error) {
        return res.status(500).json(error)
    }
}
//done
exports.getWorkById = async (req, res) => {
    try {
        let id = req.params.id
        let works = await WORK.findById(id)
        return res.status(200).json(works)
    } catch (error) {
        return res.status(500).json(error)
    }
}
//done
exports.createWork = async (req, res) => {
    try {
        let nameTeam = []
        let { name, projectId, startTime, endTime, createId, teamId, leaderId } = req.body
        let start = MOMENT(startTime, "MM-DD-YYYY")
        let end = MOMENT(endTime, "MM-DD-YYYY")
        let team
        if (leaderId != undefined || leaderId != null) {
            team = await TEAM.create({
                teamName: null,
                createId: createId,
                leaderId: leaderId,
                status: false,
                listTeams: teamId,
            })
        }
        for (i of teamId) {
            let team = await TEAM.findById(i)
            nameTeam.push(team.teamName)
        }

        let work
        if (teamId.length == 1) {
            work = await WORK.create({
                teamId: teamId,
                status: false,
                createId: createId,
                name: name,
                projectId: projectId,
                startTime: start,
                endTime: end
            })
        } else if (teamId.length > 1) {
            work = await WORK.create({
                teamId: team.id,
                status: false,
                createId: createId,
                name: name,
                projectId: projectId,
                startTime: start,
                endTime: end
            })
        }

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
        let start = MOMENT(startTime, "MM-DD-YYYY")
        let end = MOMENT(endTime, "MM-DD-YYYY")
        let work = await WORK.findByIdAndUpdate(id, {
            name : name,
            startTime : start,
            endTime: end,
            teamId: teamId,
            leaderId: leaderId
        })
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

        await TASK.updateMany({ status: 0 }, { $set: { listId: id } });
        work.status = true
        work.save()
        return res.status(200).json(work)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//done (Chưa test)
exports.removeWork = async (req, res) => {
    try {
        let id = req.params.id
        let { createId } = req.body
        let work = await WORK.findById(id)
        if (work.createId != createId) {
            return res.status(400).json({
                message: "Only the creator can edit"
            })
        }
        await WORK.deleteOne({ _id: id });
        await TASK.deleteMany({workId : id});
        return res.status(200).json({
            _id:id
        })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}