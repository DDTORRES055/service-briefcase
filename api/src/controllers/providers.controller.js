// Create a CRUD for providers based on the sql table file ../db-init.sql

const providersController = {}

const pool = require('../database')

providersController.getProviders = async (req, res) => {
  const providers = await pool.query('SELECT * FROM providers')
  res.json(providers)
}

providersController.getProviderById = async (req, res) => {
  const id = req.params.id
  const providers = await pool.query(
    'SELECT * FROM providers WHERE provider_id = ?',
    [id]
  )
  const provider = providers[0]
  res.json({ success: true, provider })
}

providersController.createProvider = async (req, res) => {
  const { provider_name, provider_description } = req.body
  const newSupporter = {
    supporter_type_id: 2,
  }
  const supporterQuery = await pool.query('INSERT INTO supporters set ?', [newSupporter])
  const newProvider = {
    provider_name,
    provider_description,
    provider_id: supporterQuery.insertId,
  }
  await pool.query('INSERT INTO providers set ?', [newProvider])
  res.send({ success: true, message: 'Provider saved' })
}

providersController.updateProvider = async (req, res) => {
  const { provider_name, provider_description } = req.body
  const newProvider = {
    provider_name,
    provider_description,
  }
  const id = req.params.id
  await pool.query('UPDATE providers set ? WHERE provider_id = ?', [
    newProvider,
    id,
  ])
  res.send({ success: true, message: 'Provider updated' })
}

providersController.deleteProvider = async (req, res) => {
  const id = req.params.id
  await pool.query('DELETE FROM providers WHERE provider_id = ?', [id])
  await pool.query(
    'DELETE FROM supporters WHERE supporter_id = ? AND supporter_type_id = 2',
    [id]
  )
  res.send({ success: true, message: 'Provider deleted' })
}

module.exports = providersController
