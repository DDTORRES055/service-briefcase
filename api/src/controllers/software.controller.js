// Create a CRUD for software based on the sql table file ../db-init.sql

const softwareController = {}

const pool = require('../database')

softwareController.getSoftware = async (req, res) => {
  const software = await pool.query('SELECT * FROM software')
  res.json(software)
}

softwareController.getSoftwareById = async (req, res) => {
  const id = req.params.id
  const software = await pool.query(
    'SELECT * FROM software WHERE software_id = ?',
    [id]
  )
  const softwareById = software[0]
  res.json({ success: true, softwareById })
}

softwareController.createSoftware = async (req, res) => {
  const { software_name, software_version, provider_id } = req.body
  const newSoftware = {
    software_name,
    software_version,
    provider_id,
  }
  await pool.query('INSERT INTO software set ?', [newSoftware])
  res.send({ success: true, message: 'Software saved' })
}

softwareController.updateSoftware = async (req, res) => {
  const { software_name, software_version, provider_id } = req.body
  const newSoftware = {
    software_name,
    software_version,
    provider_id,
  }
  const id = req.params.id
  await pool.query('UPDATE software set ? WHERE software_id = ?', [
    newSoftware,
    id,
  ])
  res.send({ success: true, message: 'Software updated' })
}

softwareController.deleteSoftware = async (req, res) => {
  const id = req.params.id
  await pool.query('DELETE FROM software WHERE software_id = ?', [id])
  res.send({ success: true, message: 'Software deleted' })
}

module.exports = softwareController
