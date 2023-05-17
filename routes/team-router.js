const ROUTER = require('express').Router()
const teamController = require('../controllers/team-controller')

ROUTER.get('/team/:id',teamController.getTeamById)
ROUTER.get('/:id',teamController.getAllTeamOfUser)
ROUTER.get('/teams-project/:id',teamController.getAllTeamByIdProject)
ROUTER.get('/teams-work/:id',teamController.getAllTeamByIdWork)
ROUTER.get('/members-project/:id',teamController.getAllMemberByIdProject)
ROUTER.get('/members-team/:id',teamController.getAllMemberOfTeam)
ROUTER.get("/member-project/:id/:name",teamController.getMemberByName)
ROUTER.get('/leader-member/:id',teamController.getLeadersOfMember)
ROUTER.get("/name/:id/:name",teamController.getTeamByName)

ROUTER.post('/create',teamController.createTeam)

ROUTER.patch('/:id',teamController.updateTeam)
ROUTER.patch('/change-name/:id',teamController.changeName)
ROUTER.patch('/add-member/:id',teamController.addMember)
ROUTER.patch('/remove-member/:id',teamController.removeMember)

ROUTER.delete('/:id',teamController.removeTeamInProject)

module.exports = ROUTER