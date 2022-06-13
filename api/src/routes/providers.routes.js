const { Router } = require('express')

const providersRouter = Router()

const providersController = require('../controllers/providers.controller')

providersRouter
  .route('/')
  .get(providersController.getProviders)
  .post(providersController.createProvider)

providersRouter
  .route('/:id')
  .get(providersController.getProviderById)
  .put(providersController.updateProvider)
  .delete(providersController.deleteProvider)

module.exports = providersRouter
