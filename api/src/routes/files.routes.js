const { Router } = require('express')
const multer = require('multer')

const filesRouter = Router()

const filesController = require('../controllers/files.controller')

//#region Storage
// Setup Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination where the files should be stored on disk
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    // Set the file name on the file in the uploads folder
    cb(null, file.fieldname + '-' + Date.now() + '.pdf')
  },
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype !== 'application/pdf'
      //   ||
      //   file.mimetype !==
      //     'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      //   file.mimetype !== 'application/msword'
    ) {
      // To reject a file pass `false` or pass an error
      cb(new Error(`Forbidden file type`))
    } else {
      // To accept the file pass `true`
      cb(null, true)
    }
  },
})

// Setup multer
const upload = multer({ storage: storage }) // { destination: "uploads/"}

//#endregion

//#region Routes

filesRouter
  .route('/')
  .get(filesController.getFiles)
  .post(upload.single('file'), filesController.createFile)

filesRouter
  .route('/:id')
  .get(filesController.getFileById)
  .put(upload.single('file'), filesController.updateFile)
  .delete(filesController.deleteFile)

//#endregion

module.exports = filesRouter
