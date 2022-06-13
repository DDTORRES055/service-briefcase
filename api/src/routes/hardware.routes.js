const { Router } = require('express')

const hardwareRouter = Router()

const hardwareController = require('../controllers/hardware.controller')

hardwareRouter
  .route('/')
  .get(hardwareController.getHardware)
  .post(hardwareController.createHardware)

hardwareRouter
  .route('/:id')
  .get(hardwareController.getHardwareById)
  .put(hardwareController.updateHardware)
  .delete(hardwareController.deleteHardware)

module.exports = hardwareRouter
