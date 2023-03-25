const PROJECT = require('../models/project')
const TEAM = require('../models/team')
const MOMENT = require('moment')

//done
exports.getAllProject = async (req,res) => {
  try {
    let projects = await PROJECT.find()
    return res.status(200).json(projects)
  } catch (error) {
    return res.status(500).json(error)
  }
}

//done
exports.getProjectById = async (req,res) => {
  try {
    let id = req.params.id
    let project = await PROJECT.findById(id)
    return res.status(200).json(project)
  } catch (error) {
    return res.status(500).json(error)
  }
}

//done
exports.getProjectByName = async (req,res) => {
  try {
    let name = req.params.name
    let projects = await PROJECT.find({
      name:name
    })
    return res.status(200).json(projects)
  } catch (error) {
    return res.status(500).json(error)
  }
}

//done
exports.getProjectByIdUser = async (req,res) => {
  try {
      let id = req.params.id
      let project
      let team = await TEAM.find({
        members:{ $in: [id]},
      })
      for (let i of team) {
        project = await PROJECT.find({
          teamIds: {$in: [i.id]}
        })
      }
      return res.status(200).json(project) 
  } catch (error) {
    return res.status(500).json(error)
  }
}

//done
exports.updateProject = async (req,res) => {
  try {
    let {name,startTime, endTime,status,teamIds, background, mainProject} = req.body
    let start = MOMENT(startTime,"MM-DD-YYYY")      
    let end = MOMENT(endTime,"MM-DD-YYYY")   
    let id = req.params.id

    let projectCheck = await PROJECT.findById(id)
    if(projectCheck.mainProject != mainProject) {
      return res.status(400).json({
        message:"Only the project owner can edit"
      })
    }

    if (end - start < 0) {
      return res.status(400).json({
        message:"endTime > startTime"
      })
    }

    await PROJECT.findByIdAndUpdate(id,{
      name:name,
      start_time :start,
      end_time : end,
      status:status,
      background:background,
      teamIds:teamIds
    })  
    let project = await PROJECT.findById(id)
    return res.status(200).json(project) 
  } catch (error) {
    return res.status(500).json(error)
  }
}

//done
exports.createProject = async (req,res) => {
  try {
    let {name, startTime, endTime, teamIds , background, mainProject} = req.body
    let start = MOMENT(startTime,"MM-DD-YYYY")      
    let end = MOMENT(endTime,"MM-DD-YYYY")    
    
    if(!background){
      background = "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/project.png"
    }
    if(!startTime){
      startTime = Date.now()
    }

    if (end - start < 0) {
      return res.status(400).json({
        message:"endTime > startTime"
      })
    }

    let team = await TEAM.create({
      leaderId:mainProject,
      name: "Project Owner",
      members: [mainProject]
    })

    teamIds.push(team)

    let project = await PROJECT.create({
      name:name,
      startTime :start,
      endTime : end,
      status:1,
      background:background,
      teamIds:teamIds 
    })
    return res.status(201).json(project) 
  } catch (error) {
    return res.status(500).json(error)
  } 
}
