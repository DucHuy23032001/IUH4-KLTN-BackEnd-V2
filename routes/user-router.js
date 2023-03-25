const ROUTER = require("express").Router()
const userController = require("../controllers/user-controller")

ROUTER.get("/",userController.getAllUser)
ROUTER.get("/:id",userController.getUserById)
ROUTER.get("/name/:name",userController.getUserByName)
ROUTER.get("/email/:email",userController.getUserByEmail)
ROUTER.get("/phone/:phone",userController.getUserByPhone)

ROUTER.patch("/update/:id",userController.updateUser)
ROUTER.patch("/lock/:id",userController.lockUser)

module.exports = ROUTER