const ROUTER = require("express").Router()
const projectController = require("../controllers/project-controller")

ROUTER.get("/",projectController.getAllProject)
ROUTER.get("/:id",projectController.getProjectById)
ROUTER.get("/name/:name",projectController.getProjectByName)
ROUTER.get("/id-user/:id",projectController.getProjectByIdUser)

ROUTER.post("/create",projectController.createProject)

ROUTER.patch("/update/:id",projectController.updateProject)
// ROUTER.patch("/add-team/:id",projectController.addTeams)

ROUTER.delete("/:id",projectController.removeProject)


module.exports = ROUTER