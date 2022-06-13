// Create a CRUD for services based on the sql table file ../db-init.sql

const servicesController = {}

const pool = require('../database')

servicesController.getServices = async (req, res) => {
  const services = await pool.query('SELECT * FROM services')
  res.json(services)
}

servicesController.getServiceById = async (req, res) => {
  const id = req.params.id
  const services = await pool.query(
    'SELECT * FROM services WHERE service_id = ?',
    [id]
  )
  const servicesById = services[0]
  res.json({ success: true, servicesById })
}

servicesController.createService = async (req, res) => {
  const {
    service_name,
    status_id,
    owner_id,
    environment_id,
    hardware_id,
    dbms_id,
    software_id,
    application_id,
    service_data,
    service_sla,
    service_ola,
    service_sac,
    support_assignations,
    network_assignations,
    service_users,
  } = req.body
  const newServices = {
    service_name,
    status_id,
    owner_id,
    environment_id,
    hardware_id,
    dbms_id,
    software_id,
    application_id,
    service_data,
    service_sla,
    service_ola,
    service_sac,
  }
  await pool.query('INSERT INTO services set ?', [newServices])
  const last_id = await pool.query('SELECT LAST_INSERT_ID()')
  support_assignations.forEach(async (support) => {
    await pool.query('INSERT INTO support_assignations set ?', [
      {
        service_id: last_id[0]['LAST_INSERT_ID()'],
        support_id: support,
      },
    ])
  })
  network_assignations.forEach(async (network) => {
    await pool.query('INSERT INTO network_assignations set ?', [
      {
        service_id: last_id[0]['LAST_INSERT_ID()'],
        network_id: network,
      },
    ])
  })
  service_users.forEach(async (user) => {
    await pool.query('INSERT INTO service_users set ?', [
      {
        service_id: last_id[0]['LAST_INSERT_ID()'],
        user_id: user,
      },
    ])
  })
  res.send({ success: true, message: 'Services saved' })
}

servicesController.updateService = async (req, res) => {
  const {
    service_name,
    status_id,
    owner_id,
    environment_id,
    hardware_id,
    dbms_id,
    software_id,
    application_id,
    service_data,
    service_sla,
    service_ola,
    service_sac,
    support_assignations,
    network_assignations,
    service_users,
  } = req.body
  const newServices = {
    service_name,
    status_id,
    owner_id,
    environment_id,
    hardware_id,
    dbms_id,
    software_id,
    application_id,
    service_data,
    service_sla,
    service_ola,
    service_sac,
  }
  const id = req.params.id
  await pool.query('UPDATE services set ? WHERE service_id = ?', [
    newServices,
    id,
  ])
  await pool.query('DELETE FROM support_assignations WHERE service_id = ?', [
    id,
  ])
  await pool.query('DELETE FROM network_assignations WHERE service_id = ?', [
    id,
  ])
  await pool.query('DELETE FROM service_users WHERE service_id = ?', [id])
  support_assignations.forEach(async (support) => {
    await pool.query('INSERT INTO support_assignations set ?', [
      {
        service_id: id,
        support_id: support,
      },
    ])
  })
  network_assignations.forEach(async (network) => {
    await pool.query('INSERT INTO network_assignations set ?', [
      {
        service_id: id,
        network_id: network,
      },
    ])
  })
  service_users.forEach(async (user) => {
    await pool.query('INSERT INTO service_users set ?', [
      {
        service_id: id,
        user_id: user,
      },
    ])
  })
  res.send({ success: true, message: 'Service updated' })
}

servicesController.deleteService = async (req, res) => {
  const id = req.params.id
  await pool.query('DELETE FROM services WHERE service_id = ?', [id])
  await pool.query('DELETE FROM support_assignations WHERE service_id = ?', [
    id,
  ])
  await pool.query('DELETE FROM network_assignations WHERE service_id = ?', [
    id,
  ])
  await pool.query('DELETE FROM service_users WHERE service_id = ?', [id])
  res.send({ success: true, message: 'Service deleted' })
}

module.exports = servicesController
