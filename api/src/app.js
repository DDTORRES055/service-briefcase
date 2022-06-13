const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const { verifyAuthToken } = require('./services/jwt')

const app = express()

//#region Settings

app.set('PORT', process.env.PORT || 4000)

//#endregion

//#region Static files

app.use(express.static(path.join(__dirname, 'public')))

//#endregion

//#region Middlewares

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//#endregion

//#region Routes

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})
app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

// app.use("/api/products", verifyAuthToken, require("./routes/products.routes"));

app.use(
  '/api/applications',
  verifyAuthToken,
  require('./routes/applications.routes')
)
app.use('/api/dbms', verifyAuthToken, require('./routes/dbms.routes'))
app.use(
  '/api/departments',
  verifyAuthToken,
  require('./routes/departments.routes')
)
app.use('/api/hardware', verifyAuthToken, require('./routes/hardware.routes'))
app.use(
  '/api/networkComponents',
  verifyAuthToken,
  require('./routes/networkComponents.routes')
)
app.use('/api/networks', verifyAuthToken, require('./routes/networks.routes'))
app.use('/api/providers', verifyAuthToken, require('./routes/providers.routes'))
app.use('/api/services', verifyAuthToken, require('./routes/services.routes'))
app.use('/api/software', verifyAuthToken, require('./routes/software.routes'))
app.use('/api/teams', verifyAuthToken, require('./routes/teams.routes'))
app.use('/api/files', verifyAuthToken, require('./routes/files.routes'))
app.use('/api/users', require('./routes/users.routes'))

//#endregion

module.exports = app
