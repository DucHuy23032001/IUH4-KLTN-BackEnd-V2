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
        for (i of teamProject) {
            let team = await TEAM.findById(i)
            let user = await USER.findById(team.leaderId)
            let works = await WORK.find({
                teamId:team.id
            })
            for(j of works){
                let data = {
                    team: team.name,
                    leaderName: user.fullName,
                    works:j.name
                }
                teams.push(data)
            }
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
        for (i of teamProject) {
            var team = await TEAM.findById(i)
            for(j of team.members) {
                let taskJ = []
                let user = await USER.findById(j)
                let taskJoin = await TASK.find({
                    members: {
                        $in: j
                    }
                })
                for (k of taskJoin){
                    taskJ.push(k.name)
                }
                let item = {
                    teamName:team.name,
                    name: user.fullName,
                    avatar: user.avatar,
                    task:taskJ
                }
                members.push(item)
            }
        }
        return res.status(200).json(members)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

//done
exports.getAllMemberOfTeam = async (req, res) => {
    try {
        let id = req.params.id
        console.log(id);
        let datas = []
        let team = await TEAM.findById(id)
        for ( i of team.members) {
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
        let team = await TEAM.find({
            members: {
                $in: id
            }
        });
        return res.status(200).json(team)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

//done
exports.createTeam = async (req, res) => {
    try {
        let { name, members, leaderId, status, createId } = req.body
        let team = await TEAM.create({
            status: status,
            leaderId:leaderId,
            name: name,
            members: members,
            createId:createId
        })
        return res.status(200).json(team)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

//done
exports.changeName = async (req, res) => {
    try {
        let id = req.params.id
        // let main
        let {newName, createId} = req.body
        let team = await TEAM.findById(id)
        if (team.createId != createId) {
            return res.status(400).json({
                message: "Only the creator can edit"
            })
        }
        team.name = newName
        await team.save();
        return res.status(200).json(roteamle)
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
        let members = team.members
        members.pull(memberId)
        team.members = members
        await team.save();
        return res.status(200).json({
            team:team,
            memberId:memberId
        })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

//d\có bug
exports.addMember = async (req, res) => {
    try {
        let id = req.params.id
        let { memberIds } = req.body
        let team = await TEAM.findById(id)
        let members = team.members
        let check = false
        // let newMembers = []
        for (let i of memberIds) {
            for (let j of members) {

                if (i == j) {
                    check = true
                }
            }
            console.log(check);
            if (!check) {
                members.push(i)
            } else {
                console.log(i);
                console.log(memberIds);
                newMembers = memberIds.pull(i)
            }
        }
        await team.save();
        return res.status(200).json({
            team: team,
            newMembers: memberIds
        })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}