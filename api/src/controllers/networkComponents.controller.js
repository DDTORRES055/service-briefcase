// Create a CRUD for network_components based on the sql table file ../db-init.sql

const networkComponentsController = {}

const pool = require('../database')

networkComponentsController.getNetworkComponents = async (req, res) => {
  const networkComponents = await pool.query('SELECT * FROM network_components')
  res.json(networkComponents)
}

networkComponentsController.getNetworkComponentById = async (req, res) => {
  const id = req.params.id
  const networkComponents = await pool.query(
    'SELECT * FROM network_components WHERE network_component_id = ?',
    [id]
  )
  const networkComponentsById = networkComponents[0]
  res.json({ success: true, networkComponentsById })
}

networkComponentsController.createNetworkComponent = async (req, res) => {
  const { network_component_name, network_component_version, provider_id } =
    req.body
  const newNetworkComponent = {
    network_component_name,
    network_component_version,
    provider_id,
  }
  await pool.query('INSERT INTO network_components set ?', [
    newNetworkComponent,
  ])
  res.send({ success: true, message: 'NetworkComponent saved' })
}

networkComponentsController.updateNetworkComponent = async (req, res) => {
  const { network_component_name, network_component_version, provider_id } =
    req.body
  const newNetworkComponent = {
    network_component_name,
    network_component_version,
    provider_id,
  }
  const id = req.params.id
  await pool.query(
    'UPDATE network_components set ? WHERE network_component_id = ?',
    [newNetworkComponent, id]
  )
  res.send({ success: true, message: 'NetworkComponents updated' })
}

networkComponentsController.deleteNetworkComponent = async (req, res) => {
  const id = req.params.id
  await pool.query(
    'DELETE FROM network_components WHERE network_component_id = ?',
    [id]
  )
  res.send({ success: true, message: 'NetworkComponent deleted' })
}

module.exports = networkComponentsController
