const { Router } = require('express')

const networkComponentsRouter = Router()

const networkComponentsController = require('../controllers/networkComponents.controller')

networkComponentsRouter
  .route('/')
  .get(networkComponentsController.getNetworkComponents)
  .post(networkComponentsController.createNetworkComponent)

networkComponentsRouter
  .route('/:id')
  .get(networkComponentsController.getNetworkComponentById)
  .put(networkComponentsController.updateNetworkComponent)
  .delete(networkComponentsController.deleteNetworkComponent)

module.exports = networkComponentsRouter
