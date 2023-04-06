const ROUTER = require('express').Router()
const teamController = require('../controllers/team-controller')

ROUTER.get('/team/:id',teamController.getTeamById)
ROUTER.get('/:id',teamController.getAllTeamOfUser)
ROUTER.get('/teams-project/:id',teamController.getAllTeamByIdProject)
ROUTER.get('/teams-work/:id',teamController.getAllTeamByIdWork)
ROUTER.get('/members-project/:id',teamController.getAllMemberByIdProject)
ROUTER.get('/members-team/:id',teamController.getAllMemberOfTeam)


ROUTER.post('/create',teamController.createTeam)

ROUTER.patch('/change-name/:id',teamController.changeName)
ROUTER.patch('/add-member/:id',teamController.addMember)
ROUTER.patch('/remove-member/:id',teamController.removeMember)

ROUTER.patch('/add-team/:id',teamController.addTeam)
ROUTER.patch('/remove-team/:id',teamController.removeTeam)

module.exports = ROUTER