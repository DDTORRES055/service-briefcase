const { Router } = require('express')

const statusesRouter = Router()

const statusesController = require('../controllers/statuses.controller')

statusesRouter.route('/').get(statusesController.getStatuses)

module.exports = statusesRouter
