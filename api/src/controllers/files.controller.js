// Create a CRUD for files based on the sql table file ../db-init.sql

const filesController = {}

const pool = require('../database')

filesController.getFiles = async (req, res) => {
  const files = await pool.query(`
  SELECT * FROM files
  `)
  res.json(files)
}

filesController.getFileById = async (req, res) => {
  const id = req.params.id
  const files = await pool.query('SELECT * FROM files WHERE file_id = ?', [id])
  const fileById = files[0]
  res.json({ success: true, fileById })
}

filesController.createFile = async (req, res) => {
  const { service_id, file_type } = req.body
  const { path } = req.file
  const newFile = {
    file_name: path.split('/').pop(),
    file_path: path,
  }
  const fileQuery = await pool.query('INSERT INTO files set ?', [newFile])
  await pool.query(
    `UPDATE services SET ${
      file_type === 'sla' ? 'sla_id' : file_type === 'ola' ? 'ola_id' : 'sac_id'
    } = ? WHERE service_id = ?`,
    [fileQuery.insertId, service_id]
  )
  res.send({ success: true, message: 'File saved' })
}

filesController.updateFile = async (req, res) => {
  const { file_name, file_data } = req.body
  const newFile = {
    file_name,
    file_data,
  }
  const fileQuery = await pool.query('INSERT INTO files set ?', [newFile])
  res.send({ success: true, message: 'File saved' })
}

filesController.deleteFile = async (req, res) => {
  const id = req.params.id
  const fileQuery = await pool.query('DELETE FROM files WHERE file_id = ?', [
    id,
  ])
  res.send({ success: true, message: 'File deleted' })
}

module.exports = filesController
