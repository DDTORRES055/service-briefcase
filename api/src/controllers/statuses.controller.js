const statusesController = {}

const pool = require('../database')

statusesController.getStatuses = async (req, res) => {
  const statuses = await pool.query('SELECT * FROM statuses')
  res.json(statuses)
}

module.exports = statusesController
