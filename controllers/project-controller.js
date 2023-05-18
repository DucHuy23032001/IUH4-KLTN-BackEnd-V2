const PROJECT = require('../models/project')
const WORK = require('../models/work')
const TASK = require('../models/task')
const TEAM = require('../models/team')
const USER = require('../models/user')
const NOTE = require('../models/note')
const MEMBER = require('../models/member')
const MOMENT = require('moment')
const awsService = require('../services/aws-service')

//done
exports.getAllProject = async (req, res) => {
  try {
    let projects = await PROJECT.find()
    let datas = []
    for (p of projects) {
      let teams = await TEAM.find({
        projectId: p.id
      })
      let idTeams = []
      let user = await USER.findById(p.mainProject)
      if (teams.length > 0) {
        for (t of teams) {
          idTeams.push(t.id)
        }
      }
      let data = {
        _id: p.id,
        name: p.name,
        startTime: p.startTime,
        endTime: p.endTime,
        status: p.status,
        background: p.background,
        teamIds: idTeams,
        mainProject: p.mainProject,
        mainName: user.fullName
      }
      datas.push(data)
    }
    return res.status(200).json(datas)
  } catch (error) {
    return res.status(500).json(error)
  }
}
//done
exports.getProjectById = async (req, res) => {
  try {
    let id = req.params.id
    let project = await PROJECT.findById(id)
    if (project != undefined) {
      let idTeams = []

      let teams = await TEAM.find({
        projectId: id
      })
      for (i of teams) {
        if (i != null) {
          let members = await MEMBER.find({
            teamId: i.id
          })
        }
        idTeams.push(i.id)
      }

      let user = await USER.findById(project.mainProject)
      let data = {
        _id: project.id,
        name: project.name,
        startTime: project.startTime,
        endTime: project.endTime,
        status: project.status,
        background: project.background,
        teamIds: idTeams,
        mainProject: project.mainProject,
        mainName: user.fullName
      }
      return res.status(200).json(data)
    }
    return res.status(200).json([])
  } catch (error) {
    return res.status(500).json(error)
  }
}
//done
exports.getProjectByName = async (req, res) => {
  try {
    let name = req.params.name.toLowerCase()
    let datas = []
    let projects = await PROJECT.find()
    if (projects.length > 0 ) {
      for (p of projects) {
        if (p.name.toLowerCase().includes(name)) {
          let idTeams = []
          let teams = await TEAM.find({
            projectId: p.id
          })
          for (i of teams) {
            idTeams.push(i.id)
          }
          let user = await USER.findById(p.mainProject)
          let data = {
            _id: p.id,
            name: p.name,
            startTime: p.startTime,
            endTime: p.endTime,
            status: p.status,
            background: p.background,
            teamIds: idTeams,
            mainProject: projects.mainProject,
            mainName: user.fullName
          }
          datas.push(data)
        }
      }
    }
    return res.status(200).json(projects)
  } catch (error) {
    return res.status(500).json(error)
  }
}
//done
exports.getProjectByIdUser = async (req, res) => {
  try {
    let id = req.params.id
    let datas = []
    let members = await MEMBER.find({
      userId: id
    })

    let pros = await PROJECT.find({
      mainProject: id
    })
    let user = await USER.findById(id)
    for (p of pros) {
      let idTeams = []
      let teams = await TEAM.find({
        projectId: p.id
      })
      for (i of teams) {
        idTeams.push(i.id)
      }

      let data = {
        _id: p.id,
        name: p.name,
        startTime: p.startTime,
        endTime: p.endTime,
        status: p.status,
        background: p.background,
        teamIds: idTeams,
        mainProject: p.mainProject,
        mainName: user.fullName
      }
      datas.push(data)
    }

    if( members.length > 0) {
      for (i of members) {
        let team = await TEAM.findById(i.teamId)
        let p = await PROJECT.findById(team.projectId)
        console.log(p);
        let teams = await TEAM.find({
          projectId: team.projectId
        })
        let idTeams = []
        if( teams.length > 0) {
          let teams = await TEAM.find({
            projectId: p.id
          })
          for (i of teams) {
            idTeams.push(i.id)
          }
        }
        let user2 = await USER.findById(p.mainProject)
        let data = {
          _id: p.id,
          name: p.name,
          startTime: p.startTime,
          endTime: p.endTime,
          status: p.status,
          background: p.background,
          teamIds: idTeams,
          mainProject: p.mainProject,
          mainName: user2.fullName
        }
        datas.push(data)
      }
    }
    return res.status(200).json(datas)
  } catch (error) {
    return res.status(500).json(error)
  }
}
//done
exports.updateProject = async (req, res) => {
  try {
    let id = req.params.id
    let { name, startTime, endTime, status, background, mainProject } = req.body
    let start = MOMENT(startTime, "MM-DD-YYYY")
    let end = MOMENT(endTime, "MM-DD-YYYY")

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
      background: background
    })
    let p = await PROJECT.findById(id)

    let teams = await TEAM.find({
      projectId: id
    })
    let idTeams = []
    if( teams.length > 0) {
      let teams = await TEAM.find({
        projectId: p.id
      })
      for (i of teams) {
        idTeams.push(i.id)
      }
    }
    let user = await USER.findById(p.mainProject)
    let data = {
      _id: p.id,
      name: p.name,
      startTime: p.startTime,
      endTime: p.endTime,
      status: p.status,
      background: p.background,
      teamIds: idTeams,
      mainProject: p.mainProject,
      mainName: user.fullName
    }
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error)
  }
}
//done
exports.createProject = async (req, res) => {
  try {
    let { name, startTime, endTime, mainProject } = req.body

    let start = MOMENT(startTime, "MM-DD-YYYY")
    let end = MOMENT(endTime, "MM-DD-YYYY")
    if (end - start < 0) {
      return res.status(400).json({
        message: "endTime > startTime"
      })
    }

    let pathBackground
    if (req.files == null) {
      pathBackground = "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/project.png"
    }
    else {
      pathBackground = await awsService.uploadFileToS3(req, res, req.files.background)
    }

    let project = await PROJECT.create({
      name: name,
      startTime: start,
      endTime: end,
      status: false,
      background: pathBackground,
      mainProject: mainProject
    })

    let idTeams = []
    let user = await USER.findById(mainProject)
    // console.log(user);
    let teams = await TEAM.find({
      projectId: project.id
    })
    console.log(teams);
    if (teams.length > 0){
      for (i of teams) {
        idTeams.push(i.id)
      }
    }
    // console.log(idTeams);
    let data = {
      _id: project.id,
      name: project.name,
      startTime: project.startTime,
      endTime: project.endTime,
      status: project.status,
      background: project.background,
      teamIds: idTeams,
      mainProject: project.mainProject,
      mainName: user.fullName
    }
    // console.log(data);
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error)
  }
}

//done 
exports.removeProject = async (req, res) => {
  try {
    let id = req.params.id
    await PROJECT.deleteOne({ _id: id });
    let works = await WORK.find({ projectId: id })
    
    let teams = await TEAM.find({
      projectId: id
    })

    for ( t of teams) {
      await MEMBER.deleteMany({ teamId : t.id });
    }
    await TEAM.deleteMany({ projectId: id });

    for (i of works) {
      await WORK.deleteOne({ _id: i.id });
      let task = await TASK.find({
        workId : i.id
      })
      for ( t of task) {
        await NOTE.deleteMany({ taskId: t.id });
      }
      await TASK.deleteMany({ workId: i.id });
    }
    return res.status(200).json({ _id: id })
  } catch (error) {
    return res.status(500).json({ msg: error })
  }
}
// Chưa test
exports.changeStatus = async (req, res) => {
  try {
    let mainProject = req.body.mainProject
    let id = req.params.id

    let project = await PROJECT.findById(id)
    if (project.mainProject != mainProject) {
      return res.status(400).json({
        message: "Only the project owner can edit"
      })
    }

    let works = await WORK.find({
      projectId: id
    })

    for (w of works) {
      w.status = true
      await TASK.updateMany({ status: true }, { $set: { workId: w._id } });
      w.save()
    }
    project.status = true
    project.save()
    return res.status(200).json(work)
  } catch (error) {
    return res.status(500).json(error)
  }
}