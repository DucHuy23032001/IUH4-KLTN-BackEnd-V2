const TEAM = require('../models/team')
const PROJECT = require('../models/project')
const USER = require('../models/user')
const TASK = require('../models/task')
const WORK = require('../models/work')
const MEMBER = require('../models/member')
const PARTITIONTABLE = require('../models/partitionTable')
const MEMBERWORK = require('../models/memberWork')

//done (v2)
exports.getAllTeamByIdProject = async (req, res) => {
    try {
        let datas = []
        let id = req.params.id

        let teams = await TEAM.find({
            projectId: id
        })
        if (teams.length > 0) {
            for (item of teams) {
                let workNames = []
                let leaderId = null
                let leaderName = null
                let members = await MEMBER.find({
                    teamId: item.id
                })

                let memberWork = await MEMBERWORK.find({
                    teamId: item.id
                })

                if (memberWork.length > 0) {
                    for (m of memberWork) {
                        let w = await WORK.findById(m.workId)
                        workNames.push(w.name)
                    }
                }

                if (members.length > 0) {
                    for (m2 of members) {
                        if (m2.number == 0) {
                            let user = await USER.findById(m2.userId)
                            leaderName = user.fullName
                            leaderId = user.id
                        }
                    }
                }
                let data = {
                    _id: item._id,
                    teamName: item.teamName,
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
        if (teams.length > 0) {
            for (t of teams) {
                let members = await MEMBER.find({
                    teamId: t._id
                })
                for (m of members) {
                    if (allMembers.length > 0) {
                        let check = true
                        for (u of allMembers) {
                            if (u.id == m.userId) {
                                check = false
                            }
                        }
                        if (check) {
                            let user = await USER.findById(m.userId)
                            allMembers.push(user)
                        }
                    } else {
                        let user = await USER.findById(m.userId)
                        allMembers.push(user)
                    }
                }
            }
        }
        if (allMembers.length > 0) {
            for (u of allMembers) {
                let taskOfUser = []
                let teamName = []
                let position

                if (allTasks.length > 0) {
                    for (a of allTasks) {
                        let partitions = await PARTITIONTABLE.find({
                            taskId: a.id
                        })
                        for (p of partitions) {
                            if (p.userId == u.id) {
                                taskOfUser.push(a.name)
                            }
                        }
                    }
                }

                for (t of teams) {
                    let members = await MEMBER.find({
                        teamId: t.id
                    })
                    for (m of members) {
                        if (m.userId == u.id) {
                            if (m.number == 0) {
                                position = "Leader"
                            } else if (m.number == 1) {
                                position = "Member"
                            }
                            teamName.push(t.teamName)
                        }
                    }
                }
                let item = {
                    _id: u.id,
                    teamName: teamName,
                    position: position,
                    name: u.fullName,
                    avatar: u.avatar,
                    task: taskOfUser
                }
                datas.push(item)
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
        let datas = []
        let id = req.params.id
        let memberWork = await MEMBERWORK.find({
            workId: id
        })

        if (memberWork.length > 0) {
            for (m of memberWork) {
                let team = await TEAM.findById(m.teamId)
                let members = await MEMBER.find({
                    teamId: m.teamId
                })

                // console.log(members);
                let leaderName
                let listMembers = []

                if (members.length > 0) {
                    for (m of members) {
                        let user = await USER.findById(m.userId)
                        if (m.number == 1) {
                            console.log(m.number);
                            let data = {
                                id: user.id,
                                fullName: user.fullName
                            }
                            listMembers.push(data)
                        }
                        else if (m.number == 0) {
                            leaderName = user.fullName
                            console.log(leaderName);
                        }
                    }
                }
                let data = {
                    _id: team.id,
                    teamName: team.teamName,
                    leaderName: leaderName,
                    listMembers: listMembers
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
exports.getAllMemberOfTeam = async (req, res) => {
    try {
        let id = req.params.id
        let datas = []
        let members = await MEMBER.find({
            teamId: id
        })
        for (i of members) {
            let user = await USER.findById(i.userId)
            let data = {
                "_id": user.id,
                "fullName": user.fullName,
                "birthday": user.birthday,
                "address": user.address,
                "phoneNumber": user.phoneNumber,
                "gender": user.gender,
                "status": user.status,
                "avatar": user.avatar,
                "accountId": user.accountId,
                "__v": user.__v
            }
            datas.push(data)
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
            console.log(members);
            if (members.length > 0) {
                for (m of members) {
                    if (m.number == 0) {
                        leaderId = m.userId
                    }
                    if (m.number == 1) {
                        listMembers.push(m.userId)
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
            leaderId: leaderId,
            teamName: team.teamName,
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
        if (teams.length > 0) {
            for (t of teams) {
                if (t.teamName.toLowerCase().includes(name)) {
                    let workNames = []
                    let leaderName
                    let leaderId

                    let memberWork = await MEMBERWORK.find({
                        teamId: t.id
                    })
                    console.log(memberWork);
                    if (memberWork.length > 0) {
                        for (m of memberWork) {
                            let work = await WORK.findById(m.workId)
                            workNames.push(work.name)
                        }
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
                        teamName: t.teamName,
                        leaderName: leaderName,
                        workName: workNames,
                        leaderId: leaderId
                    }
                    datas.push(data)
                }
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
        let allMembers = []
        let allTasks = []
        let id = req.params.id

        let works = await WORK.find({
            projectId: id
        })
        let teams = await TEAM.find({
            projectId: id
        })
        if (teams.length > 0) {
            for (t of teams) {
                let members = await MEMBER.find({
                    teamId: t._id
                })
                for (m of members) {
                    if (allMembers.length > 0) {
                        let check = true
                        for (u of allMembers) {
                            if (u.id == m.userId) {
                                check = false
                            }
                        }
                        if (check) {
                            let user = await USER.findById(m.userId)
                            allMembers.push(user)
                        }
                    } else {
                        let user = await USER.findById(m.userId)
                        allMembers.push(user)
                    }
                }
            }
        }

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

        for (m of allMembers) {
            let user = await USER.findById(m.id)
            if (user.fullName.toLowerCase().includes(name)) {
                if (allTasks.length > 0) {
                    let tasks = []
                    let teamName = []
                    let position = null
                    for (a of allTasks) {
                        let partitions = await PARTITIONTABLE.find({
                            taskId: a.id
                        })
                        for (p of partitions) {
                            if (p.userId == m.id) {
                                tasks.push(a.name)
                            }
                        }
                    }
                    for (t of teams) {
                        let members = await MEMBER.find({
                            teamId: t.id
                        })
                        for (mem of members) {
                            if (mem.userId == m.id) {
                                teamName.push(t.teamName)
                                if (mem.number == 0) {
                                    position = "Leader"
                                } else if (mem.number == 1) {
                                    position = "Member"
                                }
                            }
                        }
                    }
                    let data = {
                        _id: user.id,
                        teamName: teamName,
                        position: position,
                        name: user.fullName,
                        avatar: user.avatar,
                        task: tasks
                    }
                    datas.push(data)
                } else {
                    let teamName = []
                    let position = null
                    for (t of teams) {
                        let members = await MEMBER.find({
                            teamId: t.id
                        })
                        for (mem of members) {
                            if (mem.userId == m.id) {
                                teamName.push(t.teamName)
                                if (mem.number == 0) {
                                    position = "Leader"
                                } else if (mem.number == 1) {
                                    position = "Member"
                                }
                            }
                        }
                    }
                    let data = {
                        _id: user.id,
                        teamName: teamName,
                        position: position,
                        name: user.fullName,
                        avatar: user.avatar,
                        task: []
                    }
                    datas.push(data)
                }
            }
        }
        return res.status(200).json(datas);
    } catch (error) {
        return res.status(500).json({ msg: error });
    }
};
//done
exports.createTeam = async (req, res) => {
    try {
        let { teamName, createId, projectId, leaderId, listMembers } = req.body

        let team = await TEAM.create({
            teamName: teamName,
            createId: createId,
            projectId: projectId
        })

        await MEMBER.create({
            userId: leaderId,
            teamId: team.id,
            number: 0
        })
        for (m of listMembers) {
            await MEMBER.create({
                userId: m,
                teamId: team.id,
                number: 1
            })
        }

        let data = {
            _id: team.id,
            teamName: team.teamName,
            listMembers: listMembers,
            leaderId: leaderId,
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
        let { teamName, leaderId, listMembers } = req.body

        let team = await TEAM.findById(id)
        team.teamName = teamName
        team.save()

        let members = await MEMBER.find({
            teamId: id
        })

        if (members.length > 0) {
            if (listMembers.length > 0) {
                let checkLeader = true
                let idM = null
                for (m of members) {
                    if (m.number == 1) {
                        let checkMember = true
                        for (l of listMembers) {
                            if (m.userId == l) {
                                checkMember = false
                            }
                        }
                        if (checkMember) {
                            await MEMBER.deleteOne({ _id: m.id })
                        }
                    } else if (m.number == 0) {
                        if (m.userId == leaderId) {
                            checkLeader = false
                        } else {
                            idM = m.id
                        }
                    }
                }
                if (checkLeader) {
                    await MEMBER.deleteOne({ _id: idM })
                }
            } else {
                let checkLeader = true
                let idM = null
                for (m of members) {
                    if (m.number == 1) {
                        await MEMBER.deleteOne({ _id: m.id })
                    } else if (m.number == 0) {
                        if (m.userId == leaderId) {
                            checkLeader = false
                        } else {
                            idM = m.id
                        }
                    }
                }
                if (checkLeader) {
                    await MEMBER.deleteOne({ _id: idM })
                }
            }
        }

        let membersAdd = await MEMBER.find({
            teamId: id
        })

        if (membersAdd.length > 0) {
            if (listMembers.length > 0) {
                for (l of listMembers) {
                    let checkMember = true
                    for (m of membersAdd) {
                        if (m.userId == l && m.number == 1) {
                            checkMember = false
                        }
                    }
                    if (checkMember) {
                        await MEMBER.create({
                            userId: l,
                            number: 1,
                            teamId: id
                        })
                    }
                }
                let checkLeader = true
                for (m of membersAdd) {
                    if (m.number == 0) {
                        checkLeader = false
                    }
                }
                if (checkLeader) {
                    await MEMBER.create({
                        userId: leaderId,
                        number: 0,
                        teamId: id
                    })
                }
            } else {
                let checkLeader = true
                for (m of membersAdd) {
                    if (m.number == 0) {
                        checkLeader = false
                    }
                }
                if (checkLeader) {
                    await MEMBER.create({
                        userId: leaderId,
                        number: 0,
                        teamId: id
                    })
                }
            }
        } else {
            for (l of listMembers) {
                await MEMBER.create({
                    userId: l,
                    number: 1,
                    teamId: id
                })
            }
            await MEMBER.create({
                userId: leaderId,
                number: 0,
                teamId: id
            })
        }

        let membersRes = await MEMBER.find({
            teamId: id
        })
        let listMembersRes = []
        let leaderIdRes = null
        if (membersRes.length > 0) {
            for (m of membersRes) {
                if (m.number == 1) {
                    listMembersRes.push(m.userId)
                }
                if (m.number == 0) {
                    leaderIdRes = m.userId
                }
            }
        }

        let data = {
            _id: team.id,
            teamName: team.teamName,
            createId: team.createId,
            listMembers: listMembersRes,
            leaderId: leaderIdRes,
            createAt: team.createdAt,
            projectId: team.projectId
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
        let { teamName } = req.body
        let team = await TEAM.findById(id)

        team.teamName = teamName
        await team.save();

        let listMembers = []
        let leaderId = null

        let members = await MEMBER.find({
            teamId: id
        })
        if (members.length > 0) {
            for (m of members) {
                if (m.number == 1) {
                    listMembers.push(m.userId)
                }
                if (m.number == 0) {
                    leaderId = m.userId
                }
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
        let members2 = await MEMBER.find({
            teamId: id
        })
        if (members2.length > 0) {
            for (m of members2) {
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
exports.removeMemberIdProject = async (req, res) => {
    try {
        let id = req.params.id
        let { memberId } = req.body
        let teams = await TEAM.find({
            projectId: id
        })
        if (teams.length > 0) {
            for (t of teams) {
                let members = await MEMBER.find({
                    teamId: t.id
                })
                console.log(members);
                if (members.length > 0) {
                    for (m of members) {
                        console.log(memberId == m.userId);
                        if (memberId == m.userId) {
                            let partitions = await PARTITIONTABLE.find({
                                userId: memberId
                            })
                            console.log(partitions);
                            if (partitions.length > 0) {
                                for (p of partitions) {
                                    await PARTITIONTABLE.deleteOne({ _id: p.id });
                                }
                            }
                            await MEMBER.deleteOne({ _id: m.id });
                        }
                    }
                }
            }
        }
        return res.status(200).json(memberId)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
//done
exports.addMember = async (req, res) => {
    try {
        let id = req.params.id
        let { memberIds } = req.body
        console.log(id);
        let team = await TEAM.findById(id)
        let members = await MEMBER.find({
            teamId: id
        })

        for (j of memberIds) {
            let check = true
            for (m of members) {
                if (m.number == 1) {
                    if (j == m.userId) {
                        check = false
                    }
                } else if (m.number == 0) {
                    if (j == m.userId) {
                        check = false
                    }
                }
            }
            console.log(check);
            if (check) {
                await MEMBER.create({
                    teamId: id,
                    userId: j,
                    number: 1
                })
            }
        }
        let listMembers = []
        let memberRes = await MEMBER.find({
            teamId: id
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
        let team = await TEAM.findById(id)
        let leaderId = null
        let listMembers = []
        let members2 = await MEMBER.find({
            teamId: id
        })
        if (members2.length > 0) {
            for (m of members2) {
                if (m.number == 0) {
                    leaderId = m.userId
                } else if (m.number == 1) {
                    listMembers.push(m.userId)
                }
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
        let memberWork = await MEMBERWORK.find({
            teamId: id
        })
        for (m of memberWork) {
            let tasks = await TASK.find({
                workId: m.workId
            })
            for (t of tasks) {
                await PARTITIONTABLE.deleteMany({ taskId: t.id });
            }
            await MEMBERWORK.deleteOne({ workId: m.workId });
        }
        await TEAM.deleteOne({ _id: id });
        await MEMBER.deleteMany({ teamId: id });

        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}