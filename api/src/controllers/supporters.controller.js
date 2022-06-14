// Create a CRUD for supporters based on the sql table file ../db-init.sql

const supportersController = {}

const pool = require('../database')

supportersController.getSupporters = async (req, res) => {
  const supporters = await pool.query(
    `SELECT * 
    FROM supporters 
    INNER JOIN supporter_types
    ON supporters.supporter_type_id = supporter_types.supporter_type_id
    LEFT JOIN teams 
    ON supporters.supporter_id = teams.team_id 
    LEFT JOIN providers 
    ON supporters.supporter_id = providers.provider_id`
  )
  res.json(supporters)
}

supportersController.getSupporterById = async (req, res) => {
  const id = req.params.id
  const supporters = await pool.query(
    `SELECT * 
    FROM supporters 
    INNER JOIN supporter_types
    ON supporters.supporter_type_id = supporter_types.supporter_type_id
    LEFT JOIN teams 
    ON supporters.supporter_id = teams.team_id 
    LEFT JOIN providers 
    ON supporters.supporter_id = providers.provider_id 
    WHERE supporter_id = ?`,
    [id]
  )
  const supporter = supporters[0]
  res.json({ success: true, supporter })
}

module.exports = supportersController
