const { Router } = require('express')

const supportersRouter = Router()

const supportersController = require('../controllers/supporters.controller')

supportersRouter.route('/').get(supportersController.getSupporters)
supportersRouter.route('/:id').get(supportersController.getSupporterById)

module.exports = supportersRouter
