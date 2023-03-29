const ROUTER = require("express").Router()
const authController = require("../controllers/auth-controller")

// const multer = require('multer')
// const storage =  multer.memoryStorage()
// const upload = multer({storage:storage})


ROUTER.post("/sign-up",authController.signUp)
ROUTER.post("/sign-in",authController.signIn)

module.exports = ROUTER