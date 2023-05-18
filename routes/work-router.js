const ROUTER = require("express").Router()
const workController = require("../controllers/work-controller")

ROUTER.get("/:id",workController.getWorkById)
ROUTER.get("/all-work-project/:id",workController.getAllWorkByProjectId)
ROUTER.get("/name/:id/:name",workController.getWorkByName)
ROUTER.get("/id-user/:id/:userId",workController.getWorkByIdUser)

ROUTER.post("/",workController.createWork)

ROUTER.patch("/:id",workController.updateWork)
ROUTER.patch("/change-name/:id",workController.changeNameWork)
ROUTER.patch("/change-status/:id",workController.changeStatusWork)

ROUTER.delete("/:id",workController.removeWork)

module.exports = ROUTER