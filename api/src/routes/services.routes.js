const { Router } = require('express')

const servicesRouter = Router()

const servicesController = require('../controllers/services.controller')

servicesRouter
  .route('/')
  .get(servicesController.getServices)
  .post(servicesController.createService)

servicesRouter
  .route('/:id')
  .get(servicesController.getServiceById)
  .put(servicesController.updateService)
  .delete(servicesController.deleteService)

servicesRouter
  .route('/details/:id')
  .get(servicesController.getServiceDetailsById)

module.exports = servicesRouter
