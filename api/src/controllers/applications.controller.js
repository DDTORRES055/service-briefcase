// Create a CRUD for applications based on the sql table file ../db-init.sql

const applicationsController = {}

const pool = require('../database')

applicationsController.getApplications = async (req, res) => {
  const applications = await pool.query('SELECT * FROM applications')
  res.json(applications)
}

applicationsController.getApplicationById = async (req, res) => {
  const id = req.params.id
  const applications = await pool.query(
    'SELECT * FROM applications WHERE application_id = ?',
    [id]
  )
  const applicationsById = applications[0]
  res.json({ success: true, applicationsById })
}

applicationsController.createApplication = async (req, res) => {
  const { application_name, application_version, provider_id } = req.body
  const newApplication = {
    application_name,
    application_version,
    provider_id,
  }
  await pool.query('INSERT INTO applications set ?', [newApplication])
  res.send({ success: true, message: 'Application saved' })
}

applicationsController.updateApplication = async (req, res) => {
  const { application_name, application_version, provider_id } = req.body
  const newApplication = {
    application_name,
    application_version,
    provider_id,
  }
  const id = req.params.id
  await pool.query('UPDATE applications set ? WHERE application_id = ?', [
    newApplication,
    id,
  ])
  res.send({ success: true, message: 'Application updated' })
}

applicationsController.deleteApplication = async (req, res) => {
  const id = req.params.id
  await pool.query('DELETE FROM applications WHERE application_id = ?', [id])
  res.send({ success: true, message: 'Application deleted' })
}

module.exports = applicationsController
