const { Router } = require('express')

const networksRouter = Router()

const networksController = require('../controllers/networks.controller')

networksRouter
  .route('/')
  .get(networksController.getNetworks)
  .post(networksController.createNetwork)

networksRouter
  .route('/:id')
  .get(networksController.getNetworkById)
  .put(networksController.updateNetwork)
  .delete(networksController.deleteNetwork)

module.exports = networksRouter
