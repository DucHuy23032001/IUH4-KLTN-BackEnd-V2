const TEAM = require('../models/team')
const PROJECT = require('../models/project')
const USER = require('../models/user')
const TASK = require('../models/task')
const WORK = require('../models/work')

//done
exports.getAllTeamByIdProject = async (req, res) => {
    try {
        let teams = []
        let workName = []
        let id = req.params.id
        let project = await PROJECT.findById(id)
        let teamProject = project.teamIds
        let arrays = []
        for (i of teamProject) {
            console.log(i);
            let array = {
                id: i,
                name: []
            }
            arrays.push(array)
        }
        let works = await WORK.find({
            projectId: project.id
        })
        for (i of works) {
            for (j of arrays) {
                var team = await TEAM.findById(j.id)
                if (i.teamId.equals(j.id)) {
                    j.name.push(i.name)
                    if (team.listTeams.length > 0) {
                        for (k of team.listTeams) {
                            for (m of arrays) {
                                if (m.id.equals(k)) {
                                    m.name.push(i.name)
                                }
                            }
                        }
                    }
                }
            }
        }
        for (item of arrays) {
            console.log(item);
            var team = await TEAM.findById(item.id)
            var user = await USER.findById(team.leaderId)
            let data = {
                _id: item.id,
                teamName: team.teamName,
                leaderName: user.fullName,
                workName: item.name
            }
            teams.push(data)
        }
        return res.status(200).json(teams)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
//done
exports.getAllMemberByIdProject = async (req, res) => {
    try {
        let members = []
        let id = req.params.id
        let project = await PROJECT.findById(id)
        let teamProject = project.teamIds
        // console.log(teamProject);
        for (i of teamProject) {
            var team = await TEAM.findById(i)
            console.log(team);
            for (j of team.listMembers) {
                let taskJ = []
                let user = await USER.findById(j)
                console.log(user);
                let taskJoin = await TASK.find({
                    members: {
                        $in: j
                    }
                })
                if (taskJoin.length > 0) {
                    for (k of taskJoin) {
                        taskJ.push(k.name)
                    }
                    let item = {
                        _id: j,
                        teamName: team.teamName,
                        name: user.fullName,
                        avatar: user.avatar,
                        task: taskJ
                    }
                    console.log(item);
                    members.push(item)
                }
                else if (taskJoin.length == 0) {
                    let item = {
                        _id: j,
                        teamName: team.teamName,
                        name: user.fullName,
                        avatar: user.avatar,
                        task: taskJ
                    }
                    console.log(item);
                    members.push(item)
                }
                if (team.listTeams.length > 0) {
                    for (j of team.listMembers) {
                        let taskJ = []
                        let user = await USER.findById(j)
                        let taskJoin = await TASK.find({
                            members: {
                                $in: j
                            }
                        })
                        if (taskJoin.length > 0) {
                            for (k of taskJoin) {
                                taskJ.push(k.name)
                            }
                            let item = {
                                _id: j,
                                teamName: team.teamName,
                                name: user.fullName,
                                avatar: user.avatar,
                                task: taskJ
                            }
                            members.push(item)
                        }
                        else if (taskJoin.length == 0) {
                            let item = {
                                _id: j,
                                teamName: team.teamName,
                                name: user.fullName,
                                avatar: user.avatar,
                                task: taskJ
                            }
                            members.push(item)
                        }
                    }
                }
            }
        }
        return res.status(200).json(members)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

//done
exports.getAllTeamByIdWork = async (req, res) => {
    try {
        let teams = []
        let id = req.params.id
        let work = await WORK.findById(id)
        let teamId = work.teamId
        let team = await TEAM.findById(teamId)
        let user = await USER.findById(team.leaderId)

        if (team.listMembers.length > 0) {
            let data = {
                _id: team.id,
                teamName: team.teamName,
                leaderName: user.fullName,
                listMembers: team.listMembers
            }
            teams.push(data)
        }

        if (team.listTeams.length > 0) {
            for (i of team.listTeams) {
                let team = await TEAM.findById(i)
                let user = await USER.findById(team.leaderId)

                if (team.listMembers.length > 0) {
                    let data = {
                        _id: team.id,
                        teamName: team.teamName,
                        leaderName: user.fullName,
                        listMembers: team.listMembers
                    }
                    teams.push(data)
                }
                if (team.listTeams.length > 0) {
                    for (i of team.listTeams) {
                        let team = await TEAM.findById(i)
                        let user = await USER.findById(team.leaderId)

                        if (team.listMembers.length > 0) {
                            let data = {
                                _id: team.id,
                                teamName: team.teamName,
                                leaderName: user.fullName,
                                listMembers: team.listMembers
                            }
                            teams.push(data)
                        }
                    }
                }
            }
        }
        return res.status(200).json(teams)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

//done
exports.getAllMemberOfTeam = async (req, res) => {
    try {
        let id = req.params.id
        let datas = []
        let team = await TEAM.findById(id)
        for (i of team.listMembers) {
            let user = await USER.findById(i)
            datas.push(user)
        }
        return res.status(200).json(datas)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
//done
exports.getAllTeamOfUser = async (req, res) => {
    try {
        let id = req.params.id
        let datas = []
        let teams = await TEAM.find({
            listMembers: {
                $in: id
            }
        });
        for (i of teams) {
            let data = {
                _id: i.id,
                leaderId: i.leaderId,
                teamName: i.teamName,
                listMembers: i.listMembers,
                listTeams: i.listTeams,
                createId: i.createId,
                createAt: i.createdAt
            }
            datas.push(data)
        }
        return res.status(200).json(datas)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
//done
exports.getTeamById = async (req, res) => {
    try {
        let id = req.params.id
        let team = await TEAM.findById(id);
        let data = {
            _id: team.id,
            leaderId: team.leaderId,
            teamName: team.teamName,
            listMembers: team.listMembers,
            listTeams: team.listTeams,
            createId: team.createId,
            createAt: team.createdAt
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
//done
exports.createTeam = async (req, res) => {
    try {
        let { teamName, listMembers, listTeams, leaderId, createId, projectId, status } = req.body
        let team = await TEAM.create({
            leaderId: leaderId,
            teamName: teamName,
            listMembers: listMembers,
            listTeams: listTeams,
            createId: createId,
            status: status
        })
        let project = await PROJECT.findById(projectId)
        project.teamIds.push(team.id)
        project.save()
        let data = {
            _id: team.id,
            leaderId: team.leaderId,
            teamName: team.teamName,
            listMembers: team.listMembers,
            listTeams: team.listTeams,
            createId: team.createId,
            createAt: team.createdAt,
            status: team.status,
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
        // let main
        let { newName, createId } = req.body
        let team = await TEAM.findById(id)
        if (team.createId != createId) {
            return res.status(400).json({
                message: "Only the creator can edit"
            })
        }
        team.teamName = newName
        await team.save();
        let data = {
            _id: team.id,
            leaderId: team.leaderId,
            teamName: team.teamName,
            listMembers: team.listMembers,
            listTeams: team.listTeams,
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
        let { memberId, createId } = req.body
        let team = await TEAM.findById(id)
        if (team.createId != createId) {
            return res.status(400).json({
                message: "Only the creator can edit"
            })
        }
        let members = team.listMembers
        members.pull(memberId)
        team.listMembers = members
        await team.save();
        let data = {
            _id: team.id,
            leaderId: team.leaderId,
            teamName: team.teamName,
            listMembers: team.listMembers,
            listTeams: team.listTeams,
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
        if (team.createId != createId) {
            return res.status(400).json({
                message: "Only the creator can edit"
            })
        }
        let members = team.listMembers
        for (i of memberIds) {
            let check = false
            for (j of members) {
                if (j == i) {
                    check = true
                }
            }
            if (!check) {
                members.push(i)
            }
        }
        team.listMembers = members
        await team.save();
        let data = {
            _id: team.id,
            leaderId: team.leaderId,
            teamName: team.teamName,
            listMembers: team.listMembers,
            listTeams: team.listTeams,
            createId: team.createId,
            createAt: team.createdAt
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

//done (Chưa test)
exports.addTeam = async (req, res) => {
    try {
        let id = req.params.id
        let { teamIds, createId } = req.body
        let team = await TEAM.findById(id)
        if (team.createId != createId) {
            return res.status(400).json({
                message: "Only the creator can edit"
            })
        }
        let teams = team.listTeams
        for (i of teamIds) {
            let check = false
            for (j of teams) {
                if (j == i) {
                    check = true
                }
            }
            if (!check) {
                teams.push(i)
            }
        }
        team.listTeams = teams
        await team.save();
        let data = {
            _id: team.id,
            leaderId: team.leaderId,
            teamName: team.teamName,
            listMembers: team.listMembers,
            listTeams: team.listTeams,
            createId: team.createId,
            createAt: team.createdAt
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

//done (Chưa test)
exports.removeTeam = async (req, res) => {
    try {
        let id = req.params.id
        let { teamId, createId } = req.body
        let team = await TEAM.findById(id)
        if (team.createId != createId) {
            return res.status(400).json({
                message: "Only the creator can edit"
            })
        }
        let teams = team.listTeams
        teams.pull(teamId)
        team.listTeams = teams
        await team.save();
        let data = {
            _id: team.id,
            leaderId: team.leaderId,
            teamName: team.teamName,
            listMembers: team.listMembers,
            listTeams: team.listTeams,
            createId: team.createId,
            createAt: team.createdAt
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}