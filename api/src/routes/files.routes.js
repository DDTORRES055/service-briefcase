const { Router } = require('express')

const filesRouter = Router()

const filesController = require('../controllers/files.controller')

const { upload } = require('../services/multer')

filesRouter
  .route('/')
  .get(filesController.getFiles)
  .post(upload.single('file'), filesController.createFile)

filesRouter
  .route('/:id')
  .get(filesController.getFileById)
  .put(upload.single('file'), filesController.updateFile)
  .delete(filesController.deleteFile)

module.exports = filesRouter
