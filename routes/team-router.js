const ROUTER = require('express').Router()
const teamController = require('../controllers/team-controller')

ROUTER.get('/:id',teamController.getAllTeamOfUser)
ROUTER.get('/teams/:id',teamController.getAllTeamByIdProject)
ROUTER.get('/members/:id',teamController.getAllMemberByIdProject)

ROUTER.post('/create',teamController.createTeam)

ROUTER.patch('/change-name/:id',teamController.changeName)
ROUTER.patch('/add-member/:id',teamController.addMember)
ROUTER.patch('/remove-member/:id',teamController.removeMember)

module.exports = ROUTER