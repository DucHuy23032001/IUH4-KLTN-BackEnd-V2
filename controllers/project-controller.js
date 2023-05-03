const PROJECT = require('../models/project')
const WORK = require('../models/work')
const TASK = require('../models/task')
const TEAM = require('../models/team')
const USER = require('../models/user')
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
    for (i of project.teamIds) {
      if (i != null) {
        let team = await TEAM.findById(i)
        console.log(team);
        idLeaders.push(team.leaderId)
      }
    }

    let user = await USER.findById(project.mainProject)

    let data = {
      _id: project.id,
      name: project.name,
      startTime: project.startTime,
      endTime: project.endTime,
      status: false,
      background: project.background,
      teamIds: project.teamIds,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      __v: 0,
      leaders: idLeaders,
      mainProject: project.mainProject,
      mainName: user.fullName
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
      name: {'$regex': name,$options:'i'}
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
    let pathBackground 
    if (req.files == null) {
      pathBackground = "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/project.png"
    }
    else {
      pathBackground = await awsService.uploadFileToS3(req, res, req.files.background)
    }

    if (!startTime) {
      startTime = Date.now()
    }

    if (end - start < 0) {
      return res.status(400).json({
        message: "endTime > startTime"
      })
    }

    let teams = []
    if ( teamIds != null) {
      if (Array.isArray(teamIds)) {
        teams = teamIds
      }
      else {
        teams.push(teamIds)
      }
    } 
    if( teamIds == '') {
      teams = []
    }
    let project = await PROJECT.create({
      name: name,
      startTime: start,
      endTime: end,
      status: 1,
      background: pathBackground,
      mainProject: mainProject,
      teamIds: teams
    })
    return res.status(200).json(project)
  } catch (error) {
    return res.status(500).json(error)
  }
}


// Chưa test
exports.addTeams = async (req, res) => {
  try {
    let { teamIds, mainProject } = req.body
    let id = req.params.id
    let project = await PROJECT.findById(id)

    if (project.mainProject != mainProject) {
      return res.status(400).json({
        message: "Only the main project can edit"
      })
    }

    let teams = project.teamIds
    for (i of teamIds) {
      let check = true
      for (j of project.teamIds) {
        if (j == i) {
          check = false
        }
      }
      if (check) {
        teams.push(i)
      }
    }

    project.teamIds = teams
    project.save()
    return res.status(200).json(project)
  } catch (error) {
    return res.status(500).json(error)
  }
}

//done (Chưa test)
exports.removeProject = async (req, res) => {
  try {
      let id = req.params.id
      await PROJECT.deleteOne({ _id: id });
      let works = await WORK.find({projectId: id})
      for ( i of works) {
        await WORK.deleteOne({ _id: i.id });
        await TASK.deleteMany({workId : i.id});
      }
      return res.status(200).json({_id:id})
  } catch (error) {
      return res.status(500).json({ msg: error })
  }
}