const { Router } = require('express')

const teamsRouter = Router()

const teamsController = require('../controllers/teams.controller')

teamsRouter
  .route('/')
  .get(teamsController.getTeams)
  .post(teamsController.createTeam)

teamsRouter
  .route('/:id')
  .get(teamsController.getTeamById)
  .put(teamsController.updateTeam)
  .delete(teamsController.deleteTeam)

module.exports = teamsRouter
