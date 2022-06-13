const { Router } = require('express')

const departmentsRouter = Router()

const departmentsController = require('../controllers/departments.controller')

departmentsRouter
  .route('/')
  .get(departmentsController.getDepartments)
  .post(departmentsController.createDepartment)

departmentsRouter
  .route('/:id')
  .get(departmentsController.getDepartmentById)
  .put(departmentsController.updateDepartment)
  .delete(departmentsController.deleteDepartment)

module.exports = departmentsRouter
