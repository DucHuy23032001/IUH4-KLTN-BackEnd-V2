const TEAM = require('../models/team')
const PROJECT = require('../models/project')
const USER = require('../models/user')
const TASK = require('../models/task')
const WORK = require('../models/work')

//done
exports.getAllTeamByIdProject = async (req, res) => {               
    try {
        let teams = []
        let id = req.params.id
        let project = await PROJECT.findById(id)

        let teamProject = project.teamIds
        let arrays = []
        for (i of teamProject) {
            let array = {
                _id: i,
                name: []
            }
            arrays.push(array)
        }
        let works = await WORK.find({
            projectId: project.id
        })
        // console.log(arrays);
        for (i of works) {
            for (j of arrays) {
                if( i.teamId != null) {
                    if (i.teamId.equals(j._id)) {
                        j.name.push(i.name)
                    }
                    var team = await TEAM.findById(j._id)
                    if (team.listTeams.length > 0) {
                        for (k of team.listTeams) {
                                if (j.id.equals(k)) {
                                    j.name.push(i.name)
                                }
                        }
                    } 
                }
            }
            // if( i.teamId != null ){
            //     let teamMain = await TEAM.findById(i.teamId)
            //     if (teamMain.listTeams.length > 0) {
            //         for (k of teamMain.listTeams) {
            //             console.log(k);
            //                 if (j._id.equals(k)) {
            //                     j.name.push(i.name)
            //                 }
            //         }
            //     } else {
            //         j.name.push(i.name)
            //     }
            // }
        }
        for (item of arrays) {
            var team = await TEAM.findById(item._id)
            var user = await USER.findById(team.leaderId)
            let data = {
                _id: item._id,
                teamName: team.teamName,
                leaderName: user.fullName,
                workName: item.name,
                leaderId: team.leaderId
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
        let datas = []
        let allMembers = []
        let allTasks = []
        let id = req.params.id

        let project = await PROJECT.findById(id)
        let works = await WORK.find({
            projectId: id
        })
        if (works.length > 0) {
            for (i of works) {
                if( i.teamId != null) {
                    console.log(i.teamId);
                    let team = await TEAM.findById(i.teamId)
                    let user = await USER.findById(team.leaderId)
                    let dt = {
                        team: [],
                        note: 1,
                        data: user
                    }
                    allMembers.push(dt)
                    if ( team.listMembers.length > 0) {
                        for (h of team.listMembers) {
                            let user = await USER.findById(h)
                            let dt = {
                                team: [],
                                note: 2,
                                data: user
                            }
                            allMembers.push(dt)
                        }
                    }
                }
                let tasks = await TASK.find({
                    workId: i._id
                })
                if (tasks.length > 0) {
                    for (j of tasks) {
                        allTasks.push(j)
                    }
                }
                console.log("123");
            }
        }
        let teamProject = project.teamIds
        if (teamProject != null) {
            for (i of teamProject) {
                let team = await TEAM.findById(i)
                let listMembers = team.listMembers
                if (allMembers.length > 0) {
                    listMembers.push(team.leaderId)
                    for (u of listMembers) {
                        let check = false
                        for (m of allMembers) {
                            if (m.data.id == u) {
                                check = true
                                m.team.push(team)
                                console.log(u);
                            }
                        }
                        if (check == false) {
                            if (team.leaderId.equals(u)) {
                                let user = await USER.findById(team.leaderId)
                                let dt = {
                                    team: [team],
                                    note: 1,
                                    data: user
                                }
                                allMembers.push(dt)
                            } else {
                                let user = await USER.findById(u)
                                let dt = {
                                    team: [team],
                                    note: 2,
                                    data: user
                                }
                                allMembers.push(dt)
                            }
                        }
                    }
                }
                else {
                    let leader = await USER.findById(team.leaderId)
                    let dt = {
                        team: [team],
                        note: 1,
                        data: leader
                    }
                    allMembers.push(dt)
                    for (h of team.listMembers) {
                        let user = await USER.findById(h)
                        let dt2 = {
                            team: [team],
                            note: 2,
                            data: user
                        }
                        allMembers.push(dt2)
                    }
                }
            }
        }

        console.log(allMembers);


        for (i of allMembers) {
            let tasks = []
            for (k of allTasks) {
                if (k.members.includes(i.data._id)) {
                    tasks.push(k.name)
                }
            }
            let teamName = []
            for (k of i.team) {
                teamName.push(k.teamName)
            }
            if (i.note == 1) {
                let item = {
                    _id: i.data._id,
                    teamName: teamName,
                    position: "Leader",
                    name: i.data.fullName,
                    avatar: i.data.avatar,
                    task: tasks
                }
                datas.push(item)
            }
            if (i.note == 2) {
                let item = {
                    _id: i.data._id,
                    teamName: teamName,
                    position: "Member",
                    name: i.data.fullName,
                    avatar: i.data.avatar,
                    task: tasks
                }
                datas.push(item)
            }
        }
        return res.status(200).json(datas)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
// done
exports.getLeadersOfTeam = async (req, res) => {
    try {
        let members = []
        let id = req.params.id
        let project = await PROJECT.findById(id)
        let teamProject = project.teamIds
        if (teamProject != null) {
            for (i of teamProject) {
                let team = await TEAM.findById(i)
                if (team.listTeams.length > 0) {
                    members.push(team.leaderId)
                }
            }
        }
        return res.status(200).json(members)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
// done
exports.getLeadersOfMember = async (req, res) => {
    try {
        let members = []
        let id = req.params.id
        let project = await PROJECT.findById(id)
        let teamProject = project.teamIds
        if (teamProject != null) {
            for (i of teamProject) {
                let team = await TEAM.findById(i)
                if (team.listTeams.length == 0) {
                    members.push(team.leaderId)
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

        if (teamId != null) {
            let teamId = work.teamId
            let team = await TEAM.findById(teamId)
            let user = await USER.findById(team.leaderId)

            if (team.listMembers.length > 0) {
                let listMembers = []
                for (i of team.listMembers) {
                    let user = await USER.findById(i)
                    let data = {
                        id: user.id,
                        fullName: user.fullName
                    }
                    listMembers.push(data)
                }
                let data = {
                    _id: team.id,
                    teamName: team.teamName,
                    leaderName: user.fullName,
                    listMembers: listMembers
                }
                teams.push(data)
            }

            if (team.listTeams.length > 0) {
                for (i of team.listTeams) {
                    let team = await TEAM.findById(i)
                    let user = await USER.findById(team.leaderId)

                    if (team.listMembers.length > 0) {
                        let listMembers = []
                        for (j of team.listMembers) {
                            let user1 = await USER.findById(j)
                            let data = {
                                id: user1.id,
                                fullName: user1.fullName
                            }
                            listMembers.push(data)
                        }
                        let data = {
                            _id: team.id,
                            teamName: team.teamName,
                            leaderName: user.fullName,
                            listMembers: listMembers
                        }
                        teams.push(data)
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
exports.getTeamByName = async (req, res) => {
    try {
        let datas = []
        let id = req.params.id
        let name = req.params.name.toLowerCase()

        let project = await PROJECT.findById(id)
        let works = await WORK.find({
            projectId: id
        })
        for (t of project.teamIds) {
            let team = await TEAM.findById(t)
            if (team.teamName.toLowerCase().includes(name)) {
                let leader = await USER.findById(team.leaderId)
                for (w of works) {
                    let workNames = []
                    if (w.teamId == t) {
                        workNames.push(w.name)
                    } else {
                        let team = await TEAM.findById(w.teamId)
                        if (team.listTeams.length > 0) {
                            for (tIn of team.listTeams) {
                                console.log(tIn);
                                if (w.teamId == tIn) {
                                    workNames.push(j.name)
                                }
                            }
                        }
                    }
                    let data = {
                        _id: team.id,
                        teamName: team.teamName,
                        leaderName: leader.fullName,
                        workName: workNames,
                        leaderId: team.leaderId
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
//done
exports.getMemberByName = async (req, res) => {
    try {
        let name = req.params.name.toLowerCase()

        let datas = []
        let allMembers = []
        let allTasks = []
        let id = req.params.id
        let project = await PROJECT.findById(id)
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
        let teamProject = project.teamIds
        if (teamProject != null) {
            for (i of teamProject) {
                let team = await TEAM.findById(i)
                let listMembers = team.listMembers
                if (allMembers.length > 0) {
                    listMembers.push(team.leaderId)
                    for (u of listMembers) {
                        let check = false
                        for (m of allMembers) {
                            if (m.data.id == u) {
                                check = true
                                m.team.push(team)
                            }
                        }
                        if (check) {
                            m.team.push(team)
                        } else {
                            if (team.leaderId.equals(u)) {
                                let user = await USER.findById(u)
                                if (user.fullName.toLowerCase().includes(name)) {
                                    let dt = {
                                        team: [team],
                                        note: 1,
                                        data: leader
                                    }
                                    allMembers.push(dt)
                                }
                            } else {
                                let user = await USER.findById(u)
                                if (user.fullName.toLowerCase().includes(name)) {
                                    let dt = {
                                        team: [team],
                                        note: 1,
                                        data: leader
                                    }
                                    allMembers.push(dt)
                                }
                            }
                        }
                    }
                }
                else {
                    let leader = await USER.findById(team.leaderId)
                    if (leader.fullName.toLowerCase().includes(name)) {
                        let dt = {
                            team: [team],
                            note: 1,
                            data: leader
                        }
                        allMembers.push(dt)
                    }
                    for (h of team.listMembers) {
                        let user = await USER.findById(h)
                        if (user.fullName.toLowerCase().includes(name)) {
                            let dt2 = {
                                team: [team],
                                note: 2,
                                data: user
                            }
                            allMembers.push(dt2)
                        }
                    }
                }
            }
        }
        for (i of allMembers) {
            let tasks = []
            for (k of allTasks) {
                if (k.members.includes(i.data._id)) {
                    tasks.push(k.name)
                }
            }
            let teamName = []
            for (k of i.team) {
                teamName.push(k.teamName)
            }
            if (i.note == 1) {
                let item = {
                    _id: i.data._id,
                    teamName: teamName,
                    position: "Leader",
                    name: i.data.fullName,
                    avatar: i.data.avatar,
                    task: tasks
                }
                datas.push(item)
            }
            if (i.note == 2) {
                let item = {
                    _id: i.data._id,
                    teamName: teamName,
                    position: "Member",
                    name: i.data.fullName,
                    avatar: i.data.avatar,
                    task: tasks
                }
                datas.push(item)
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
        let { teamName, listMembers, listTeams, leaderId, createId, projectId } = req.body
        let team = await TEAM.create({
            leaderId: leaderId,
            teamName: teamName,
            listMembers: listMembers,
            listTeams: listTeams,
            createId: createId
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
        let { teamName, listMembers, listTeams, leaderId, createId, projectId } = req.body
        let team = await TEAM.findByIdAndUpdate(id, {
            leaderId: leaderId,
            teamName: teamName,
            listMembers: listMembers,
            listTeams: listTeams,
            createId: createId
        })
        let data = {
            _id: team.id,
            leaderId: team.leaderId,
            teamName: team.teamName,
            listMembers: team.listMembers,
            listTeams: team.listTeams,
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
        let { memberId } = req.body
        let team = await TEAM.findById(id)
        let members = team.listMembers
        members.pull(memberId)
        team.listMembers = members

        let tasks = await TASK.find({
            members: {
                $in: memberId
            }
        })

        for (i of tasks) {
            i.members.pull(memberId)
            i.save()
        }

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
//done 
exports.addTeamInTeam = async (req, res) => {
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
//done 
exports.removeTeamInTeam = async (req, res) => {
    try {
        let id = req.params.id
        let { teamId } = req.body
        let team = await TEAM.findById(id)
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
// done
exports.removeTeamInProject = async (req, res) => {
    try {
        let id = req.params.id
        let projectId = req.params.projectId
        let team = await TEAM.findById(id)
        let members = team.listMembers
        for (j of members) {
            let tasks = await TASK.find({
                members: {
                    $in: j
                }
            })
            for (t of tasks) {
                t.members.pull(j)
                t.save()
            }
        }
        let works = await WORK.find({
            teamId: id
        })
        for (i of works) {
            if (i.projectId == projectId) {
                i.teamId = null
                i.save()
            }
        }
        let pro = await PROJECT.findById(projectId)
        pro.teamIds.pull(id)
        pro.save()
        return res.status(200).json({
            _id: id
        })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}