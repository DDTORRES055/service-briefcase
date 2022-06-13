const { Router } = require('express')

const dbmsRouter = Router()

const dbmsController = require('../controllers/dbms.controller')

dbmsRouter
  .route('/')
  .get(dbmsController.getDbms)
  .post(dbmsController.createDbms)

dbmsRouter
  .route('/:id')
  .get(dbmsController.getDbmsById)
  .put(dbmsController.updateDbms)
  .delete(dbmsController.deleteDbms)

module.exports = dbmsRouter
