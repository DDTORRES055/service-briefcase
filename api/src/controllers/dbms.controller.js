// Create a CRUD for dbms based on the sql table file ../db-init.sql

const dbmsController = {}

const pool = require('../database')

dbmsController.getDbms = async (req, res) => {
  const dbms = await pool.query('SELECT * FROM dbms')
  res.json(dbms)
}

dbmsController.getDbmsById = async (req, res) => {
  const id = req.params.id
  const dbms = await pool.query('SELECT * FROM dbms WHERE dbms_id = ?', [id])
  const dbmsById = dbms[0]
  res.json({ success: true, dbmsById })
}

dbmsController.createDbms = async (req, res) => {
  const { dbms_name, dbms_version, provider_id } = req.body
  const newDbms = {
    dbms_name,
    dbms_version,
    provider_id,
  }
  await pool.query('INSERT INTO dbms set ?', [newDbms])
  res.send({ success: true, message: 'Dbms saved' })
}

dbmsController.updateDbms = async (req, res) => {
  const { dbms_name, dbms_version, provider_id } = req.body
  const newDbms = {
    dbms_name,
    dbms_version,
    provider_id,
  }
  const id = req.params.id
  await pool.query('UPDATE dbms set ? WHERE dbms_id = ?', [newDbms, id])
  res.send({ success: true, message: 'Dbms updated' })
}

dbmsController.deleteDbms = async (req, res) => {
  const id = req.params.id
  await pool.query('DELETE FROM dbms WHERE dbms_id = ?', [id])
  res.send({ success: true, message: 'Dbms deleted' })
}

module.exports = dbmsController
