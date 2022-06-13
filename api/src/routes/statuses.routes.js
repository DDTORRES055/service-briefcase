const { Router } = require('express')

const statusesRouter = Router()

const statusesController = require('../controllers/statuses.controller')

statusesRouter.route('/').get(statusesController.getEnvironments)

module.exports = statusesRouter
