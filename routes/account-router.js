const ROUTER = require('express').Router()
const accountController = require('../controllers/account-controller')

ROUTER.get("/",accountController.getAllAccount)
ROUTER.get("/:id",accountController.getAccountById)
ROUTER.get("/email/:email",accountController.getAccountByEmail)

ROUTER.post("/create",accountController.createAccount)

ROUTER.patch("/change-password/:id",accountController.changePassword)
ROUTER.patch("/forget-password",accountController.forgetPassword)

module.exports = ROUTER