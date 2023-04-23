const ROUTER = require("express").Router()
const taskController = require("../controllers/task-controller")

ROUTER.get("/:id",taskController.getTaskById)
ROUTER.get("/name/:name",taskController.getTaskByName)
ROUTER.get("/get-task-in-list/:id",taskController.getAllTaskInWork)
ROUTER.get("/get-task-in-project/:id",taskController.getAllTaskByIdProject)


ROUTER.post("/",taskController.createTask)

ROUTER.patch("/update/:id",taskController.updateTask)
ROUTER.patch("/update-status/:id",taskController.updateStatusTask )
ROUTER.patch("/change-name/:id",taskController.changeName)

ROUTER.delete("/:id",taskController.deleteTask)

module.exports = ROUTER