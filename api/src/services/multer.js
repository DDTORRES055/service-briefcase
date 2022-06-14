const multer = require('multer')
const FirebaseStorage = require('multer-firebase-storage')

const storage = FirebaseStorage({
  bucketName: process.env.FIREBASE_STORAGE_BUCKET,
  credentials: {
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
  },
  directoryPath: 'service-files',
  hooks: {
    beforeUpload(req, file) {
      file.originalname = `file-${Date.now()}.pdf`
    },
  },
})

// Setup multer
const upload = multer({ storage: storage }) // { destination: "uploads/"}

module.exports = { upload }
