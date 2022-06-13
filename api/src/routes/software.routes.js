const { Router } = require('express')

const softwareRouter = Router()

const softwareController = require('../controllers/software.controller')

softwareRouter
  .route('/')
  .get(softwareController.getSoftware)
  .post(softwareController.createSoftware)

softwareRouter
  .route('/:id')
  .get(softwareController.getSoftwareById)
  .put(softwareController.updateSoftware)
  .delete(softwareController.deleteSoftware)

module.exports = softwareRouter
