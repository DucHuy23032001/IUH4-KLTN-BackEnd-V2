const WORK = require('../models/work')
const TASK = require('../models/task')
const TEAM = require('../models/team')
const MEMBER = require('../models/member')
const PROJECT = require('../models/project')
const NOTE = require('../models/note')
const MEMBERWORK = require('../models/memberWork')

const MOMENT = require('moment')

//done
exports.getAllWorkByProjectId = async (req, res) => {
    try {
        let id = req.params.id
        let datas = []
        let works = await WORK.find({
            projectId: id
        })
        if (works.length > 0) {
            for (i of works) {
                let memberWorks = await MEMBERWORK.find({
                    workId: i.id
                })
                let leaderId = []
                let teamId = []
                let teamName = []
                if (memberWorks.length > 0) {
                    for (m of memberWorks) {
                        let t = await TEAM.findById(m.teamId)
                        teamId.push(t.id)
                        teamName.push(t.teamName)
                        let members = await MEMBER.find({
                            teamId: t.id
                        })
                        if (members.length > 0) {
                            for (m of members) {
                                if (m.number == 0) {
                                    leaderId.push(m.userId)
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
                        teamId: teamId,
                        createId: i.createId,
                        projectId: i.projectId,
                        leaderId: leaderId,
                        teamName: teamName
                    }
                    datas.push(data)
                } else {
                    let data = {
                        _id: i._id,
                        name: i.name,
                        status: i.status,
                        startTime: i.startTime,
                        endTime: i.endTime,
                        teamId: teamId,
                        createId: i.createId,
                        projectId: i.projectId,
                        leaderId: leaderId,
                        teamName: teamName
                    }
                    datas.push(data)
                }
            }
        }
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
        let userId = req.params.userId

        let works = await WORK.find({
            projectId: projectId
        })
        if (works.length > 0) {
            for (i of works) {
                let memberWorks = await MEMBERWORK.find({
                    workId: i.id
                })
                let leaderId = []
                let teamId = []
                let teamName = []
                if (memberWorks.length > 0) {
                    let check = false
                    console.log(check);
                    for (m of memberWorks) {
                        let members = await MEMBER.find({
                            teamId: m.teamId
                        })
                        if (members.length > 0) {
                            for (m of members) {
                                if (m.userId == userId) {
                                    check = true
                                }
                                if (m.number == 0) {
                                    leaderId.push(m.userId)
                                }
                            }
                        }
                        let t = await TEAM.findById(m.teamId)
                        teamId.push(t.id)
                        teamName.push(t.teamName)
                    }
                    console.log(check);
                    if (check) {
                        let data = {
                            _id: i._id,
                            name: i.name,
                            status: i.status,
                            startTime: i.startTime,
                            endTime: i.endTime,
                            teamId: teamId,
                            createId: i.createId,
                            projectId: i.projectId,
                            leaderId: leaderId,
                            teamName: teamName
                        }
                        datas.push(data)
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
        let name = req.params.name.toLowerCase()
        let works = await WORK.find({
            projectId: id
        })
        if (works.length > 0) {
            for (i of works) {
                if (i.name.toLowerCase().includes(name)) {
                    let memberWorks = await MEMBERWORK.find({
                        workId: i.id
                    })
                    if (memberWorks.length > 0) {
                        let leaderId = []
                        let teamId = []
                        let teamName = []
                        for (m of memberWorks) {
                            let t = await TEAM.findById(m.teamId)
                            teamId.push(t.id)
                            teamName.push(t.teamName)
                            let members = await MEMBER.find({
                                teamId: t.id
                            })
                            if (members.length > 0) {
                                for (m of members) {
                                    if (m.number == 0) {
                                        leaderId.push(m.userId)
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
                            teamId: teamId,
                            createId: i.createId,
                            projectId: i.projectId,
                            leaderId: leaderId,
                            teamName: teamName
                        }
                        datas.push(data)
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
exports.getWorkById = async (req, res) => {
    try {
        let data = null
        let id = req.params.id
        let work = await WORK.findById(id)
        if (work != undefined) {
            let memberWorks = await MEMBERWORK.find({
                workId: work.id
            })
            let leaderId = []
            let teamId = []
            let teamName = []
            if (memberWorks.length > 0) {
                for (m of memberWorks) {
                    let t = await TEAM.findById(m.teamId)
                    teamId.push(t.id)
                    teamName.push(t.teamName)
                    let members = await MEMBER.find({
                        teamId: t.id
                    })
                    if (members.length > 0) {
                        for (m of members) {
                            if (m.number == 0) {
                                leaderId.push(m.userId)
                            }
                        }
                    }
                }
            }
            data = {
                _id: work._id,
                name: work.name,
                status: work.status,
                startTime: work.startTime,
                endTime: work.endTime,
                teamId: teamId,
                createId: work.createId,
                projectId: work.projectId,
                leaderId: leaderId,
                teamName: teamName
            }
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}
//done
exports.createWork = async (req, res) => {
    try {
        let data
        let { name, projectId, startTime, endTime, createId, teamId } = req.body
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
            status: false,
            createId: createId,
            name: name,
            projectId: projectId,
            startTime: start,
            endTime: end
        })
        for (t of teamId) {
            await MEMBERWORK.create({
                teamId: t,
                number: 0,
                workId: work.id
            })
        }
        let memberWorks = await MEMBERWORK.find({
            workId: work.id
        })

        let leaderId = []
        let teamIdRes = []
        let teamName = []
        if (memberWorks.length > 0) {
            for (m of memberWorks) {
                let team = await TEAM.findById(m.teamId)
                teamIdRes.push(team.id)
                teamName.push(team.teamName)
                let members = await MEMBER.find({
                    teamId: team.id
                })
                if (members.length > 0) {
                    for (m of members) {
                        if (m.number == 0) {
                            leaderId.push(m.userId)
                        }
                    }
                }
            }
        }
        data = {
            _id: work._id,
            name: work.name,
            status: work.status,
            startTime: work.startTime,
            endTime: work.endTime,
            teamId: teamIdRes,
            createId: work.createId,
            projectId: work.projectId,
            leaderId: leaderId,
            teamName: teamName
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}
//done
exports.updateWork = async (req, res) => {
    try {
        let id = req.params.id
        let { name, startTime, endTime, teamId } = req.body

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
        work.save()

        let memberWorks = await MEMBERWORK.find({
            workId: id
        })
        if (teamId.length > 0) {
            if (memberWorks.length > 0) {
                let check = true
                let id = null
                for (m of memberWorks) {
                    for (t of teamId) {
                        if (t != m.teamId) {
                            check = false
                            id = m.id
                        }
                    }
                }
                if (check == false) {
                    await MEMBERWORK.deleteOne({ _id: id })
                }
            }
        } else if (teamId.length == 0) {
            if (memberWorks.length > 0) {
                for (m of memberWorks) {
                    await MEMBERWORK.deleteOne({ _id: m.id })
                }
            }
        }

        let memberWorks2 = await MEMBERWORK.find({
            workId: id
        })

        if (teamId.length > 0) {
            if (memberWorks2.length > 0) {
                for (t of teamId) {
                    let check = true
                    for (m of memberWorks2) {
                        if (m.teamId == t) {
                            check = false
                        }
                    }
                    if (check) {
                        await MEMBERWORK.create({
                            teamId: t,
                            number: 0,
                            workId: id
                        })
                    }
                }
            } else if (memberWorks2.length == 0) {
                for (t of teamId) {
                    await MEMBERWORK.create({
                        teamId: t,
                        number: 0,
                        workId: id
                    })
                }
            }
        }

        let memberWorks3 = await MEMBERWORK.find({
            workId: id
        })
        let leaderId = []
        let teamIdRes = []
        let teamName = []

        if (memberWorks3.length > 0) {
            for (m of memberWorks3) {
                let t = await TEAM.findById(m.teamId)
                teamIdRes.push(t.id)
                teamName.push(t.teamName)
                let members = await MEMBER.find({
                    teamId: t.id
                })
                if (members.length > 0) {
                    for (m of members) {
                        if (m.number == 0) {
                            leaderId.push(m.userId)
                        }
                    }
                }
            }
        }
        let data = {
            _id: work._id,
            name: work.name,
            status: work.status,
            startTime: work.startTime,
            endTime: work.endTime,
            teamId: teamIdRes,
            createId: work.createId,
            projectId: work.projectId,
            leaderId: leaderId,
            teamName: teamName
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}
//done
exports.updateTimeWork = async (req, res) => {
    try {
        let { createId, startTime, endTime } = req.body
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
        let leaderId = []
        let teamId = []
        let teamName = []
        let memberWorks = await MEMBERWORK.find({
            workId: work.id
        })
        if (memberWorks.length > 0) {
            for (m of memberWorks) {
                let teams = await TEAM.find({
                    teamId: m.teamId
                })
                if (teams.length > 0) {
                    for (t of teams) {
                        teamId.push(t.id)
                        teamName.push(t.teamName)
                        let members = await MEMBER.find({
                            teamId: t.id
                        })
                        if (members.length > 0) {
                            for (m of members) {
                                if (m.number == 0) {
                                    leaderId.push(m.userId)
                                }
                            }
                        }
                    }
                }
            }
        }
        let data = {
            _id: work._id,
            name: work.name,
            status: work.status,
            startTime: work.startTime,
            endTime: work.endTime,
            teamId: teamId,
            createId: work.createId,
            projectId: work.projectId,
            leaderId: leaderId,
            teamName: teamName
        }
        return res.status(200).json(data)
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
        let leaderId = []
        let teamId = []
        let teamName = []
        let memberWorks = await MEMBERWORK.find({
            workId: work.id
        })
        if (memberWorks.length > 0) {
            for (m of memberWorks) {
                let t = await TEAM.findById(m.teamId)
                teamId.push(t.id)
                teamName.push(t.teamName)
                let members = await MEMBER.find({
                    teamId: t.id
                })
                if (members.length > 0) {
                    for (m of members) {
                        if (m.number == 0) {
                            leaderId.push(m.userId)
                        }
                    }
                }
            }
        }
        let data = {
            _id: work._id,
            name: work.name,
            status: work.status,
            startTime: work.startTime,
            endTime: work.endTime,
            teamId: teamId,
            createId: work.createId,
            projectId: work.projectId,
            leaderId: leaderId,
            teamName: teamName
        }
        return res.status(200).json(data)
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
        let leaderId = []
        let teamId = []
        let teamName = []
        let memberWorks = await MEMBERWORK.find({
            workId: work.id
        })
        if (memberWorks.length > 0) {
            for (m of memberWorks) {
                let t = await TEAM.findById(m.teamId)
                teamId.push(t.id)
                teamName.push(t.teamName)
                let members = await MEMBER.find({
                    teamId: t.id
                })
                if (members.length > 0) {
                    for (m of members) {
                        if (m.number == 0) {
                            leaderId.push(m.userId)
                        }
                    }
                }
            }
        }
        let data = {
            _id: work._id,
            name: work.name,
            status: work.status,
            startTime: work.startTime,
            endTime: work.endTime,
            teamId: teamId,
            createId: work.createId,
            projectId: work.projectId,
            leaderId: leaderId,
            teamName: teamName
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}
//done 
exports.removeWork = async (req, res) => {
    try {
        let id = req.params.id
        await WORK.deleteOne({ _id: id });

        let memberWork = await MEMBERWORK.find({
            workId: id
        })
        if(memberWork.length > 0 ){
            await MEMBERWORK.deleteMany({ workId: id });
        }

        let note = await NOTE.find({
            workId: id
        })
        if(note.length > 0 ){
            await NOTE.deleteMany({ workId: id });
        }

        let task = await TASK.find({
            workId: id
        })
        if(task.length > 0 ){
            await TASK.deleteMany({ workId: id });
        }

        return res.status(200).json({
            _id: id
        })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}