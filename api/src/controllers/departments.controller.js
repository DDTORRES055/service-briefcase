// Create a CRUD for departments based on the sql table departments (department_id, department_name, department_description)

const departmentsController = {}

const pool = require('../database')

departmentsController.getDepartments = async (req, res) => {
  const departments = await pool.query('SELECT * FROM departments')
  res.json(departments)
}

departmentsController.getDepartmentById = async (req, res) => {
  const id = req.params.id
  const departments = await pool.query(
    'SELECT * FROM departments WHERE department_id = ?',
    [id]
  )
  const department = departments[0]
  res.json({ success: true, department })
}

departmentsController.createDepartment = async (req, res) => {
  const { department_name, department_description } = req.body
  const newDepartment = {
    department_name,
    department_description,
  }
  await pool.query('INSERT INTO departments set ?', [newDepartment])
  res.send({ success: true, message: 'Department saved' })
}

departmentsController.updateDepartment = async (req, res) => {
  const { department_name, department_description } = req.body
  const newDepartment = {
    department_name,
    department_description,
  }
  const id = req.params.id
  await pool.query('UPDATE departments set ? WHERE department_id = ?', [
    newDepartment,
    id,
  ])
  res.send({ success: true, message: 'Department updated' })
}

departmentsController.deleteDepartment = async (req, res) => {
  const id = req.params.id
  await pool.query('DELETE FROM departments WHERE _id = ?', [id])
  res.send({ success: true, message: 'Department deleted' })
}

module.exports = departmentsController
