const PROJECT = require('../models/project')
const TEAM = require('../models/team')
const MOMENT = require('moment')
const awsService = require('../services/aws-service')
//done
exports.getAllProject = async (req, res) => {
  try {
    let projects = await PROJECT.find()
    return res.status(200).json(projects)
  } catch (error) {
    return res.status(500).json(error)
  }
}

//done
exports.getProjectById = async (req, res) => {
  try {
    let id = req.params.id
    let project = await PROJECT.findById(id)
    let idLeaders = []
    let mainId
    for (i of project.teamIds) {
      let team = await TEAM.findById(i)
      idLeaders.push(team.leaderId)
      mainId = team.createId
    }

    let data = {
      _id: project.id,
      name: project.name,
      startTime:project.startTime,
      endTime: project.endTime,
      status: false,
      background: project.background,
      teamIds: project.teamIds,
      createdAt:project.createdAt,
      updatedAt: project.updatedAt,
      __v: 0,
      leaders: idLeaders,
      mainProject: mainId
    }
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error)
  }
}

//done
exports.getProjectByName = async (req, res) => {
  try {
    let name = req.params.name
    let projects = await PROJECT.find({
      name: name
    })
    return res.status(200).json(projects)
  } catch (error) {
    return res.status(500).json(error)
  }
}

//done
exports.getProjectByIdUser = async (req, res) => {
  try {
    let id = req.params.id
    let project
    let team = await TEAM.find({
      members: { $in: [id] },
    })
    for (let i of team) {
      project = await PROJECT.find({
        teamIds: { $in: [i.id] }
      })
    }
    return res.status(200).json(project)
  } catch (error) {
    return res.status(500).json(error)
  }
}

//done
exports.updateProject = async (req, res) => {
  try {
    let { name, startTime, endTime, status, teamIds, background, mainProject } = req.body
    let start = MOMENT(startTime, "MM-DD-YYYY")
    let end = MOMENT(endTime, "MM-DD-YYYY")
    let id = req.params.id

    let projectCheck = await PROJECT.findById(id)
    if (projectCheck.mainProject != mainProject) {
      return res.status(400).json({
        message: "Only the project owner can edit"
      })
    }

    if (end - start < 0) {
      return res.status(400).json({
        message: "endTime > startTime"
      })
    }

    await PROJECT.findByIdAndUpdate(id, {
      name: name,
      startTime: start,
      endTime: end,
      status: status,
      background: background,
      teamIds: teamIds
    })
    let project = await PROJECT.findById(id)
    return res.status(200).json(project)
  } catch (error) {
    return res.status(500).json(error)
  }
}

//done
exports.createProject = async (req, res) => {
  try {
    let { name, startTime, endTime, teamIds, mainProject } = req.body
    let start = MOMENT(startTime, "MM-DD-YYYY")
    let end = MOMENT(endTime, "MM-DD-YYYY")

    let background = req.files.background

    if (!background) {
      background = "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/project.png"
    }
    let pathBackground = await awsService.uploadFileToS3(req, res, background)

    if (!startTime) {
      startTime = Date.now()
    }

    if (end - start < 0) {
      return res.status(400).json({
        message: "endTime > startTime"
      })
    }

    let team = await TEAM.create({
      leaderId: mainProject,
      name: "Project Owner",
      members: [mainProject],
      createId: mainProject
    })

    // console.log(team);
    teamIds.push(team._id)

    let project = await PROJECT.create({
      name: name,
      startTime: start,
      endTime: end,
      status: 1,
      background: pathBackground,
      teamIds: teamIds
    })
    return res.status(201).json(project)
  } catch (error) {
    return res.status(500).json(error)
  }
}
