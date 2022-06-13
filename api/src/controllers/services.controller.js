// Create a CRUD for services based on the sql table file ../db-init.sql

const servicesController = {}

const pool = require('../database')

servicesController.getServices = async (req, res) => {
  const services = await pool.query(`
  SELECT
    service_id,
    service_name,
    status_name,
    department_name,
    environment_name,
    hardware_name,
    dbms_name,
    software_name,
    application_name,
    service_data,
    sla_file.file_name AS sla_file_name,
    ola_file.file_name AS ola_file_name,
    sac_file.file_name AS sac_file_name
    FROM services
    LEFT JOIN statuses
    ON services.status_id = statuses.status_id
    LEFT JOIN departments
    ON services.owner_id = departments.department_id
    LEFT JOIN environments
    ON services.environment_id = environments.environment_id
    LEFT JOIN hardware
    ON services.hardware_id = hardware.hardware_id
    LEFT JOIN dbms
    ON services.dbms_id = dbms.dbms_id
    LEFT JOIN software
    ON services.software_id = software.software_id
    LEFT JOIN applications
    ON services.application_id = applications.application_id
    LEFT JOIN files as sla_file
    ON services.sla_id = sla_file.file_id
    LEFT JOIN files as ola_file
    ON services.ola_id = ola_file.file_id
    LEFT JOIN files as sac_file
    ON services.sac_id = sac_file.file_id
  `)
  res.json(services)
}

servicesController.getServiceById = async (req, res) => {
  const id = req.params.id
  const services = await pool.query(
    'SELECT * FROM services WHERE service_id = ?',
    [id]
  )
  const service = services[0]
  res.json({ success: true, service })
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
    sla_id,
    ola_id,
    sac_id,
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
    sla_id,
    ola_id,
    sac_id,
  }
  const serviceQuery = await pool.query('INSERT INTO services set ?', [newServices])
  support_assignations.forEach(async (support) => {
    await pool.query('INSERT INTO support_assignations set ?', [
      {
        service_id: serviceQuery.insertId,
        supporter_id: support,
      },
    ])
  })
  network_assignations.forEach(async (network) => {
    await pool.query('INSERT INTO network_assignations set ?', [
      {
        service_id: serviceQuery.insertId,
        network_id: network,
      },
    ])
  })
  service_users.forEach(async (department) => {
    await pool.query('INSERT INTO service_users set ?', [
      {
        service_id: serviceQuery.insertId,
        department_id: department,
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
    sla_id,
    ola_id,
    sac_id,
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
    sla_id,
    ola_id,
    sac_id,
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
        supporter_id: support,
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
  service_users.forEach(async (department) => {
    await pool.query('INSERT INTO service_users set ?', [
      {
        service_id: id,
        department_id: department,
      },
    ])
  })
  res.send({ success: true, message: 'Service updated' })
}

servicesController.deleteService = async (req, res) => {
  const id = req.params.id
  await pool.query('DELETE FROM support_assignations WHERE service_id = ?', [
    id,
  ])
  await pool.query('DELETE FROM network_assignations WHERE service_id = ?', [
    id,
  ])
  await pool.query('DELETE FROM service_users WHERE service_id = ?', [id])
  await pool.query('DELETE FROM services WHERE service_id = ?', [id])
  res.send({ success: true, message: 'Service deleted' })
}

module.exports = servicesController
