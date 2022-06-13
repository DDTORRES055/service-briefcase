const { Router } = require('express')

const environmentsRouter = Router()

const environmentsController = require('../controllers/environments.controller')

environmentsRouter.route('/').get(environmentsController.getEnvironments)

module.exports = environmentsRouter