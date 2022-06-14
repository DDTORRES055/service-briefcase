const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { verifyAuthToken } = require('./services/jwt')

const app = express()

//#region Settings

app.set('PORT', process.env.PORT || 4000)

//#endregion

//#region Middlewares

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//#endregion

//#region Routes

app.use(
  '/api/statuses',
  verifyAuthToken,
  require('./routes/statuses.routes')
)
app.use(
  '/api/environments',
  verifyAuthToken,
  require('./routes/environments.routes')
)
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
app.use('/api/supporters', verifyAuthToken, require('./routes/supporters.routes'))
app.use('/api/teams', verifyAuthToken, require('./routes/teams.routes'))
app.use('/api/files', require('./routes/files.routes'))
app.use('/api/users', require('./routes/users.routes'))

//#endregion

module.exports = app
