// Create a CRUD for hardware based on the sql table file ../db-init.sql

const hardwareController = {}

const pool = require('../database')

hardwareController.getHardware = async (req, res) => {
  const hardware = await pool.query('SELECT * FROM hardware')
  res.json(hardware)
}

hardwareController.getHardwareById = async (req, res) => {
  const id = req.params.id
  const hardware = await pool.query(
    'SELECT * FROM hardware WHERE hardware_id = ?',
    [id]
  )
  const hardwareById = hardware[0]
  res.json({ success: true, hardwareById })
}

hardwareController.createHardware = async (req, res) => {
  const {
    hardware_name,
    cpu_frecuency,
    cpu_architecture,
    cpu_cores,
    ram_size,
    storage_size,
    ssd,
    provider_id,
  } = req.body
  const newHardware = {
    hardware_name,
    cpu_frecuency,
    cpu_architecture,
    cpu_cores,
    ram_size,
    storage_size,
    ssd,
    provider_id,
  }
  await pool.query('INSERT INTO hardware set ?', [newHardware])
  res.send({ success: true, message: 'Hardware saved' })
}

hardwareController.updateHardware = async (req, res) => {
  const {
    hardware_name,
    cpu_frecuency,
    cpu_architecture,
    cpu_cores,
    ram_size,
    storage_size,

    ssd,
    provider_id,
  } = req.body
  const newHardware = {
    hardware_name,
    cpu_frecuency,
    cpu_architecture,
    cpu_cores,
    ram_size,
    storage_size,
    ssd,
    provider_id,
  }
  const id = req.params.id
  await pool.query('UPDATE hardware set ? WHERE hardware_id = ?', [
    newHardware,
    id,
  ])
  res.send({ success: true, message: 'Hardware updated' })
}

hardwareController.deleteHardware = async (req, res) => {
  const id = req.params.id
  await pool.query('DELETE FROM hardware WHERE hardware_id = ?', [id])
  res.send({ success: true, message: 'Hardware deleted' })
}

module.exports = hardwareController
