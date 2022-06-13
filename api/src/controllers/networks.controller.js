// Create a CRUD for network based on the sql table file ../db-init.sql

const networksController = {}

const pool = require('../database')

networksController.getNetworks = async (req, res) => {
  const networks = await pool.query('SELECT * FROM networks')
  res.json(networks)
}

networksController.getNetworkById = async (req, res) => {
  const id = req.params.id
  const networks = await pool.query(
    'SELECT * FROM networks WHERE network_id = ?',
    [id]
  )
  const networksById = networks[0]
  res.json({ success: true, networksById })
}

networksController.createNetwork = async (req, res) => {
  const { network_name, network_components, provider_id } = req.body
  const newNetwork = {
    network_name,
    provider_id,
  }
  await pool.query('INSERT INTO networks set ?', [newNetwork])
  const last_id = await pool.query('SELECT LAST_INSERT_ID()')
  network_components.forEach(async (component) => {
    await pool.query('INSERT INTO network_component_assignations set ?', [
      {
        network_id: last_id[0]['LAST_INSERT_ID()'],
        network_component_id: component,
      },
    ])
  })
  res.send({ success: true, message: 'Network saved' })
}

networksController.updateNetwork = async (req, res) => {
  const { network_name, network_components, provider_id } = req.body
  const newNetwork = {
    network_name,
    provider_id,
  }
  const id = req.params.id
  await pool.query('UPDATE networks set ? WHERE network_id = ?', [
    newNetwork,
    id,
  ])
  await pool.query(
    'DELETE FROM network_component_assignations WHERE network_id = ?',
    [id]
  )
  network_components.forEach(async (component) => {
    await pool.query('INSERT INTO network_component_assignations set ?', [
      {
        network_id: id,
        network_component_id: component,
      },
    ])
  })
  res.send({ success: true, message: 'Network updated' })
}

networksController.deleteNetwork = async (req, res) => {
  const id = req.params.id
  await pool.query('DELETE FROM networks WHERE network_id = ?', [id])
  await pool.query(
    'DELETE FROM network_component_assignations WHERE network_id = ?',
    [id]
  )
  res.send({ success: true, message: 'Network deleted' })
}

module.exports = networksController
