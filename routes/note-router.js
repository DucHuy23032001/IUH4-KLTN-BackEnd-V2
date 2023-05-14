const ROUTER = require('express').Router()
const noteController = require('../controllers/note-controller')

ROUTER.get("/",noteController.getAllNote)
ROUTER.get("/:id",noteController.getNoteById)
ROUTER.get("/task/:id",noteController.getNoteByIdTask)
ROUTER.get("/work/:id",noteController.getNoteByIdWork)

ROUTER.post("/task",noteController.createNoteTask)
ROUTER.post("/work",noteController.createNoteWork)

ROUTER.patch("/:id",noteController.updateNote)

ROUTER.delete("/:id",noteController.removeNote)

module.exports = ROUTER