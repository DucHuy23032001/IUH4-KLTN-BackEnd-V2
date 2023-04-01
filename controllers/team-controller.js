const TEAM = require('../models/team')
const PROJECT = require('../models/project')
const USER = require('../models/user')
const TASK = require('../models/task')
const WORK = require('../models/work')
// const mongoose = require('mongoose');

//done
exports.getALlTeamOfProject = async (req, res) => {
    try {
        let teams = []
        let id = req.params.id
        let project = await PROJECT.findById(id)
        // console.log(projects);
        let teamProject = project.teamIds
        for (i of teamProject) {
            let team = await TEAM.findById(i)
            let user = await USER.findById(team.leaderId)
            let works = await WORK.find({
                teamId:team.id
            })
            for(j of works){
                let data = {
                    _id: team.id,
                    teamName: team.teamName,
                    leaderName: user.fullName,
                    workName:j.name
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
exports.getAllTeamByIdProject = async (req, res) => {
    try {
        let teams = []
        let id = req.params.id
        let project = await PROJECT.findById(id)
        let teamProject = project.teamIds
        for (i of teamProject) {
            let team = await TEAM.findById(i)
            // console.log(team);
            let user = await USER.findById(team.leaderId)
            let works = await WORK.find({
                teamId:team.id
            })
            if (works.length > 0) {
                for(j of works){
                    let data = {
                        _id: team.id,
                        teamName: team.teamName,
                        leaderName: user.fullName,
                        workName:j.name
                    }
                    teams.push(data)
                }
            }
            else if (works.length == 0) {
                let data = {
                    _id: team.id,
                    teamName: team.teamName,
                    leaderName: null,
                    workName:null
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
                    _id: j,
                    teamName:team.teamName,
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
        let datas = []
        let teams = await TEAM.find({
            members: {
                $in: id
            }
        });
        for ( i of teams) {
            let data = {
                _id:i.id,
                leaderId:i.leaderId,
                teamName: i.teamName,
                members: i.members,
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
            _id:team.id,
            leaderId:team.leaderId,
            teamName: team.teamName,
            members: team.members,
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
        let { teamName, members, leaderId, createId, projectId } = req.body
        let team = await TEAM.create({
            leaderId:leaderId,
            teamName: teamName,
            members: members,
            createId:createId
        })
        let project = await PROJECT.findById(projectId)
        let proId = project.teamIds.push(team.id)
        project.save()
        let data = {
            _id:team.id,
            leaderId:team.leaderId,
            teamName: team.teamName,
            members: team.members,
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
        // let main
        let {newName, createId} = req.body
        let team = await TEAM.findById(id)
        if (team.createId != createId) {
            return res.status(400).json({
                message: "Only the creator can edit"
            })
        }
        team.teamName = newName
        await team.save();
        let data = {
            _id:team.id,
            leaderId:team.leaderId,
            teamName: team.teamName,
            members: team.members,
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
        let members = team.members
        members.pull(memberId)
        team.members = members
        await team.save();
        let data = {
            _id:team.id,
            leaderId:team.leaderId,
            teamName: team.teamName,
            members: team.members,
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
        let members = team.members
        for ( i of memberIds) {
            let check = false
            for(j of members) {
                if( j == i){
                    check = true
                }
            }
            if (!check) {
                members.push(i)
            }
        }
        team.members = members
        await team.save();
        let data = {
            _id:team.id,
            leaderId:team.leaderId,
            teamName: team.teamName,
            members: team.members,
            createId: team.createId,
            createAt: team.createdAt
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}