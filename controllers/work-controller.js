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
        // console.log(works);
        for (i of works) {
            let team = await TEAM.findById(i.teamId)
            // console.log(team);
            let nameTeam = []
            if (team != null) {
                if( team.listTeams.length == 0) {
                    nameTeam.push(team.teamName)
                } else {
                    let listTeam = team.listTeams
                    for (j of listTeam) {
                        if (j != null) {
                            let itemTeam = await TEAM.findById(j)
                            nameTeam.push(itemTeam.teamName)
                        }
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

            console.log(data);

            datas.push(data)
        }
        console.log("123");
        return res.status(200).json(datas)
    } catch (error) {
        return res.status(500).json(error)
    }
}
//done
exports.getWorkByIdUser = async (req, res) => {
    try {
        let datas = []
        let projectId = req.params.id
        let userId = req.body.userId
        let team = await TEAM.find({
            listMembers: { $in: userId }
        })
        for (i of team) {
            let work = await WORK.find({
                projectId: projectId
            })
            if (work.length > 0) {
                for (j of work) {
                    {
                        if(j.teamId != null) {
                            let team = await TEAM.findById(j.teamId)
                            let data = {
                                _id: j._id,
                                name: j.name,
                                status: j.status,
                                startTime: j.startTime,
                                endTime: j.endTime,
                                teamId: j.teamId,
                                createId: j.createId,
                                projectId: j.projectId,
                                teamName: team.teamName
                            }
                            datas.push(data)
                        }
                    }

                }
            }
        }
        return res.status(200).json(datas)
    } catch (error) {
        return res.status(500).json(error)
    }
}
//done
exports.getWorkByName = async (req, res) => {
    try {
        let datas = []
        let id = req.params.id
        let name = req.params.name
        let works = await WORK.find({
            name: { '$regex': name, $options: 'i' },
            projectId: id
        })

        for ( i of works) {
            let team = await TEAM.findById(i.teamId)
            let nameTeam = []
            if (team != null) {
                let listTeam = team.listTeams
                if (listTeam.length > 0) {
                    for (j of listTeam) {
                        if (j != null) {
                            let itemTeam = await TEAM.findById(j)
                            nameTeam.push(itemTeam.teamName)
                        }
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
            teamName: [team.teamName]
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

        let team = await TEAM.create({
            leaderId: leaderId,
            teamName: name + " Team",
            listMembers: [],
            listTeams: teamId,
            createId: createId
        })

        let work = await WORK.create({
            teamId: team.id,
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
        console.log(work);
        let project = await PROJECT.findById(work.projectId)
        console.log(project);
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

        if (teamId.length > 0){
            let team = await TEAM.create({
                leaderId: leaderId,
                teamName: name + " Team",
                listMembers: [],
                listTeams: teamId,
                createId: createId
            })
            work.teamId = team.id
        }

        work.name = name
        work.startTime = start
        work.endTime = end
        
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