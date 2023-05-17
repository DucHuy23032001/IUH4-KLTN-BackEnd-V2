const TEAM = require('../models/team')
const PROJECT = require('../models/project')
const USER = require('../models/user')
const TASK = require('../models/task')
const WORK = require('../models/work')
const MEMBER = require('../models/member')
const PARTITIONTABLE = require('../models/partitionTable')

//done (v2)
exports.getAllTeamByIdProject = async (req, res) => {
    try {
        let datas = []
        let id = req.params.id
        let teams = await TEAM.find({
            projectId: id
        })

        if (teams.length > 0 ){
            for (item of teams) {
                let members = await MEMBER.find({
                    teamId: item.id
                })
                let works = await WORK.find({
                    teamId: item.id
                })
                let workNames = []
                for (w of works) {
                    workNames.push(w.name)
                }
                for (m of members) {
                    if (m.number == 0) {
                        let data = {
                            _id: item._id,
                            teamName: item.teamName,
                            leaderName: m.fullName,
                            workName: workNames,
                            leaderId: m.id
                        }
                        datas.push(data)
                    }
                }
            }
        }
        return res.status(200).json(datas)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
//done (v2)
exports.getAllMemberByIdProject = async (req, res) => {
    try {
        let datas = []
        let allMembers = []
        let allTasks = []
        let id = req.params.id

        let works = await WORK.find({
            projectId: id
        })
        if (works.length > 0) {
            for (i of works) {
                let tasks = await TASK.find({
                    workId: i._id
                })
                if (tasks.length > 0) {
                    for (j of tasks) {
                        allTasks.push(j)
                    }
                }
            }
        }

        let teams = await TEAM.find({
            projectId: id
        })

        if(teams.length > 0) {
            for (t of teams) {
                let members = await MEMBER.find({
                    teamId: t._id
                })
                for (m of members) {
                    let user = await USER.findById(m.userId)
                    if (m.number == 0) {
                        let data = {
                            id: 0,
                            user: user,
                            teamName: t.teamName
                        }
                        allMembers.push(data)
                    } else if (m.number == 1) {
                        let data = {
                            id: 1,
                            user: user,
                            teamName: t.teamName
                        }
                        allMembers.push(data)
                    }
                }
            }
    
        }
        if (allTasks.length > 0) {
            for (u of allMembers) {
                let taskOfUser = []
                for (t of allTasks) {
                    if (t.members.includes(u.user.id)) {
                        taskOfUser.push(t.name)
                    }
                }
                if (u.id == 0) {
                    let item = {
                        _id: u.user._id,
                        teamName: [u.teamName],
                        position: "Leader",
                        name: u.user.fullName,
                        avatar: u.user.avatar,
                        task: taskOfUser
                    }
                    datas.push(item)
                } else if (u.id == 1) {
                    let item = {
                        _id: u.user._id,
                        teamName: [u.teamName],
                        position: "Member",
                        name: u.user.fullName,
                        avatar: u.user.avatar,
                        task: taskOfUser
                    }
                    datas.push(item)
                }
            }
        } else {
            for (u of allMembers) {
                if (u.id == 0) {
                    let item = {
                        _id: u.user._id,
                        teamName: [u.teamName],
                        position: "Leader",
                        name: u.user.fullName,
                        avatar: u.user.avatar,
                        task: []
                    }
                    datas.push(item)
                } else if (u.id == 1) {
                    let item = {
                        _id: u.user._id,
                        teamName: [u.teamName],
                        position: "Member",
                        name: u.user.fullName,
                        avatar: u.user.avatar,
                        task: []
                    }
                    datas.push(item)
                }
            }
        }
        return res.status(200).json(datas)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
// done (v2)
exports.getLeadersOfMember = async (req, res) => {
    try {
        let leaders = []
        let id = req.params.id

        let teams = await TEAM.find({
            projectId: id
        })

        for (i of teams) {
            let members = await MEMBER.find({
                teamId: i.id
            })
            for (m of members) {
                if (m.number == 0) {
                    leaders.push(m.userId)
                }
            }
        }
        return res.status(200).json(leaders)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
//done (v2)
exports.getAllTeamByIdWork = async (req, res) => {
    try {
        let data
        let id = req.params.id
        let work = await WORK.findById(id)
        let teamId = work.teamId

        if (teamId != null) {
            let teamId = work.teamId
            let team = await TEAM.findById(teamId)
            let members = await MEMBER.find({
                teamId: teamId
            })

            let leaderName
            let listMembers = []
            for (m of members) {
                let user = await USER.findById(m.userId)
                if (m.number == 1) {
                    let data = {
                        id: user.id,
                        fullName: user.fullName
                    }
                    listMembers.push(data)
                }
                if (m.number == 0) {
                    leaderName = user.fullName
                }
            }
            data = {
                _id: teamId,
                teamName: [team.teamName],
                leaderName: leaderName,
                listMembers: listMembers
            }
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
//done (v2)
exports.getAllMemberOfTeam = async (req, res) => {
    try {
        let id = req.params.id
        let datas = []
        let members = await MEMBER.find({
            teamId: id
        })
        for (i of members) {
            let user = await USER.findById(i.userId)
            datas.push(user)
        }
        return res.status(200).json(datas)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
//done (v1)
exports.getAllTeamOfUser = async (req, res) => {
    try {
        let id = req.params.id
        let datas = []
        let members = await MEMBER.find({
            userId: id
        });
        for (i of members) {
            let team = await TEAM.findById(i.teamId)
            let members = await MEMBER.find({
                teamId: i.teamId
            });
            let leaderId
            let listMembers = []
            for (m of members) {
                if (m.number == 0) {
                    leaderId = m.userId
                }
                if (m.number == 1) {
                    listMembers.push(m.userId)
                }
            }
            let data = {
                _id: team.id,
                leaderId: [leaderId],
                teamName: [team.teamName],
                listMembers: listMembers,
                createId: team.createId,
                createAt: team.createdAt
            }
            datas.push(data)
        }
        return res.status(200).json(datas)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
//done (v2)
exports.getTeamById = async (req, res) => {
    try {
        let id = req.params.id
        let team = await TEAM.findById(id);

        let members = await MEMBER.find({
            teamId: id
        });
        let leaderId
        let listMembers = []
        for (m of members) {
            if (m.number == 0) {
                leaderId = m.userId
            }
            if (m.number == 1) {
                listMembers.push(m.userId)
            }
        }
        let data = {
            _id: team.id,
            leaderId: [leaderId],
            teamName: [team.teamName],
            listMembers: listMembers,
            createId: team.createId,
            createAt: team.createdAt
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
//done (v2)
exports.getTeamByName = async (req, res) => {
    try {
        let datas = []
        let id = req.params.id
        let name = req.params.name.toLowerCase()
        let teams = await TEAM.find({
            projectId: id
        })

        for (t of teams) {
            if (t.teamName.toLowerCase().includes(name)) {
                let workNames = []
                let leaderName
                let leaderId

                let works = await WORK.find({
                    teamId: t.id
                })

                for (w of works) {
                    workNames.push(w.name)
                }

                let members = await MEMBER.find({
                    teamId: t.id
                })

                for (m of members) {
                    if (m.number == 0) {
                        let user = await USER.findById(m.userId)
                        leaderId = m.userId
                        leaderName = user.fullName
                    }
                }
                let data = {
                    _id: t.id,
                    teamName: [t.teamName],
                    leaderName: leaderName,
                    workName: workNames,
                    leaderId: leaderId
                }
                datas.push(data)
            }
        }
        return res.status(200).json(datas)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
//done (v2)
exports.getMemberByName = async (req, res) => {
    try {
        let name = req.params.name.toLowerCase()

        let datas = []
        let allTasks = []

        let teamName = []
        let _id
        let position
        let nameRes
        let avatar
        let task
        let id = req.params.id
        let tasks = []

        let works = await WORK.find({
            projectId: id
        })

        let teams = await TEAM.find({
            projectId: id
        })

        if (works.length > 0) {
            for (i of works) {
                let tasks = await TASK.find({
                    workId: i._id
                })
                if (tasks.length > 0) {
                    for (j of tasks) {
                        allTasks.push(j)
                    }
                }
            }
        }

        for (t of teams) {
            let members = await MEMBER.find({
                teamId: t.id
            })
            for (m of members) {
                let user = await USER.findById(m.userId)
                if (user.fullName.toLowerCase().includes(name)) {
                    if (allTasks.length > 0) {
                        for (t of allTasks) {
                            let partitions = await PARTITIONTABLE.find({
                                taskId: t.id
                            })
                            for (p of partitions) {
                                if (p.userId == m.userId) {
                                    tasks.push(t.name)
                                }
                            }
                        }
                    }
                    if (m.number == 0) {
                        teamName.push(t.teamName)
                        _id = user._id
                        position = "Leader"
                        nameRes = user.fullName
                        avatar = user.avatar
                        task = tasks
                    } else if (m.number == 1) {
                        teamName.push(t.teamName)
                        _id = user._id
                        position = "Member"
                        nameRes = user.fullName
                        avatar = user.avatar
                        task = tasks
                    }
                }
            }

        }
        let item = {
            _id: _id,
            teamName: [teamName],
            position: position,
            name: nameRes,
            avatar: avatar,
            task: tasks
        }
        datas.push(item)
        return res.status(200).json(datas);
    } catch (error) {
        return res.status(500).json({ msg: error });
    }
};
//done
exports.createTeam = async (req, res) => {
    try {
        let { teamName, createId, projectId } = req.body

        let team = await TEAM.create({
            teamName: teamName,
            createId: createId,
            projectId: projectId
        })


        let members = await MEMBER.find({
            teamId: id
        })

        let listMembers = []
        let leaderId = null

        if (members.length > 0) {
            for (m of members) {
                listMembers.push(m.userId)
                if (m.number == 0) {
                    leaderId = m.userId
                }
            }
        }

        let data = {
            _id: team.id,
            teamName: [team.teamName],
            listMembers: listMembers,
            leaderId: [leaderId],
            createId: team.createId,
            createAt: team.createdAt,
            projectId: projectId
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
//done
exports.updateTeam = async (req, res) => {
    try {
        let id = req.params.id
        let { teamName, createId, projectId } = req.body
        let team = await TEAM.findByIdAndUpdate(id, {
            teamName: teamName,
            createId: createId,
            projectId: projectId
        })

        let members = await MEMBER.find({
            teamId: id
        })

        let listMembers = []
        let leaderId = null

        if (members.length > 0) {
            for (m of members) {
                listMembers.push(m.userId)
                if (m.number == 0) {
                    leaderId = m.userId
                }
            }
        }

        let data = {
            _id: team.id,
            teamName: [team.teamName],
            createId: team.createId,
            listMembers: listMembers,
            leaderId: [leaderId],
            createAt: team.createdAt,
            projectId: projectId
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
//done
exports.changeName = async (req, res) => {
    try {
        let id = req.params.id
        let { newName, createId } = req.body
        let team = await TEAM.findById(id)
        if (team.createId != createId) {
            return res.status(400).json({
                message: "Only the creator can edit"
            })
        }
        team.teamName = newName
        await team.save();

        let listMembers = []
        let leaderId = null

        let members = await MEMBER.find({
            teamId: id
        })
        if (members.length > 0) {
            for (m of members) {
                listMembers.push(m.userId)
                if (m.number == 0) {
                    leaderId = m.userId
                }
            }
        }

        let data = {
            _id: team.id,
            leaderId: [leaderId],
            teamName: [team.teamName],
            listMembers: listMembers,
            createId: team.createId,
            createAt: team.createdAt
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
//done 
exports.removeMember = async (req, res) => {
    try {
        let id = req.params.id
        let { memberId } = req.body
        let team = await TEAM.findById(id)

        let members = await MEMBER.find({
            teamId: id
        })
        if (members.length > 0) {
            for (m of members) {
                if (memberId == m.userId) {
                    let partitions = await PARTITIONTABLE.find({
                        userId: m.userId
                    })

                    for (p of partitions) {
                        await PARTITIONTABLE.deleteOne({ _id: p.id });
                    }
                    await MEMBER.deleteOne({ _id: m.id });
                }
            }
        }

        let leaderId = null
        let listMembers = []
        if (members.length > 0) {
            for (m of members) {
                if (m.number == 0) {
                    leaderId = m.userId
                } else if (m.number == 1) {
                    listMembers.push(m.userId)
                }
            }
        }

        await team.save();
        let data = {
            _id: team.id,
            leaderId: leaderId,
            teamName: team.teamName,
            listMembers: listMembers,
            createId: team.createId,
            createAt: team.createdAt
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
//done
exports.addMember = async (req, res) => {
    try {
        let id = req.params.id
        let { memberIds, createId } = req.body

        let team = await TEAM.findById(id)
        let members = await MEMBER.find({
            teamId: i
        })

        for (m of members) {
            let check = true
            for (j of memberIds) {
                if (j == m.userId) {
                    check = true
                } else {
                    check = false
                }
            }
            if (!check) {
                await MEMBER.create({
                    teamId: id,
                    userId: j,
                    number: 1
                })
            }
        }
        let listMembers = []
        let memberRes = await MEMBER.find({
            teamId: i
        })
        for (m of memberRes) {
            if (m.number == 1) {
                listMembers.push(m.userId)
            } else if (m.number == 0) {
                leaderId = m.userId
            }
        }

        let data = {
            _id: team.id,
            leaderId: leaderId,
            teamName: team.teamName,
            listMembers: listMembers,
            createId: team.createId,
            createAt: team.createdAt
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

// done
exports.removeTeamInProject = async (req, res) => {
    try {
        let id = req.params.id
        let works = await WORK.find({
            teamId: id
        })
        for (w of works) {
            await WORK.deleteOne({ _id: w.id });

            let tasks = await TASK.find({
                workId: w.id
            })
            for (t of tasks) {
                await TASK.deleteOne({ _id: t.id });
                await PARTITIONTABLE.deleteMany({ taskId: t.id });
            }
        }
        await TEAM.deleteOne({ _id: id });
        return res.status(200).json({
            _id: id
        })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}