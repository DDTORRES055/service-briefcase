const { Router } = require('express')

const applicationsRouter = Router()

const applicationsController = require('../controllers/applications.controller')

applicationsRouter
  .route('/')
  .get(applicationsController.getApplications)
  .post(applicationsController.createApplication)

applicationsRouter
  .route('/:id')
  .get(applicationsController.getApplicationById)
  .put(applicationsController.updateApplication)
  .delete(applicationsController.deleteApplication)

module.exports = applicationsRouter
