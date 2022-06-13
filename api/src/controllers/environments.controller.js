const environmentsController = {}

const pool = require('../database')

environmentsController.getEnvironments = async (req, res) => {
  const environments = await pool.query('SELECT * FROM environments')
  res.json(environments)
}

module.exports = environmentsController
