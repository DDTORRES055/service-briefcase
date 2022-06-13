// Create a CRUD for teams based on the sql table file ../db-init.sql

const teamsController = {}

const pool = require('../database')

teamsController.getTeams = async (req, res) => {
  const teams = await pool.query('SELECT * FROM teams')
  res.json(teams)
}

teamsController.getTeamById = async (req, res) => {
  const id = req.params.id
  const teams = await pool.query('SELECT * FROM teams WHERE team_id = ?', [id])
  const team = teams[0]
  res.json({ success: true, team })
}

teamsController.createTeam = async (req, res) => {
  const { team_name, team_description } = req.body
  const newSupporter = {
    supporter_type_id: 1,
  }
  await pool.query('INSERT INTO supporters set ?', [newSupporter])
  const last_id = await pool.query('SELECT LAST_INSERT_ID()')
  const newTeam = {
    team_name,
    team_description,
    team_id: last_id[0]['LAST_INSERT_ID()'],
  }
  await pool.query('INSERT INTO teams set ?', [newTeam])
  res.send({ success: true, message: 'Team saved' })
}

teamsController.updateTeam = async (req, res) => {
  const { team_name, team_description } = req.body
  const newTeam = {
    team_name,
    team_description,
  }
  const id = req.params.id
  await pool.query('UPDATE teams set ? WHERE team_id = ?', [newTeam, id])
  res.send({ success: true, message: 'Team updated' })
}

teamsController.deleteTeam = async (req, res) => {
  const id = req.params.id
  await pool.query('DELETE FROM teams WHERE team_id = ?', [id])
  await pool.query(
    'DELETE FROM supporters WHERE supporter_id = ? AND supporter_type_id = 1',
    [id]
  )
  res.send({ success: true, message: 'Team deleted' })
}

module.exports = teamsController
