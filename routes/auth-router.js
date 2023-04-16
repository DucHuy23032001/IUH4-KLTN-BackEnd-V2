const ROUTER = require("express").Router()
const authController = require("../controllers/auth-controller")

ROUTER.post("/sign-up",authController.signUp)
ROUTER.post("/sign-in",authController.signIn)

module.exports = ROUTER