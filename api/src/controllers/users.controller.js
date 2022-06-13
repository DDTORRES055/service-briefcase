// Create a CRUD for network based on the sql table file ../db-init.sql

const usersController = {}

const pool = require('../database')

var SHA256 = require('crypto-js/sha256')
const { generateAuthToken } = require('../services/jwt')

usersController.getUsers = async (req, res) => {
  const users = await pool.query('SELECT * FROM users')
  res.json(users)
}

usersController.getUser = async (req, res) => {
  const id = req.params.id
  const user = await pool.query('SELECT * FROM users WHERE user_id = ?', [id])
  res.json({ success: true, user })
}

usersController.createUser = async (req, res) => {
  const { user_name, user_password, user_email } = req.body

  const users = await pool.query('SELECT * FROM users WHERE user_email = ?', [
    user_email,
  ])

  if (users.length > 0) {
    res.send({ success: false, message: 'Username duplicated' })
    return
  }

  const newUser = {
    user_name,
    user_password: SHA256(user_password),
    user_email,
  }

  await pool.query('INSERT INTO users set ?', [newUser])
  res.send({ success: true, message: 'User saved' })
}

usersController.updateUser = async (req, res) => {
  const { user_name, user_password, user_email } = req.body
  const id = req.params.id

  await pool.query('UPDATE users set ? WHERE user_id = ?', [
    {
      user_name,
      user_password: SHA256(user_password),
      user_email,
    },
    id,
  ])
  res.send({ success: true, message: 'User updated' })
}

usersController.deleteUser = async (req, res) => {
  const id = req.params.id

  await pool.query('DELETE FROM users WHERE user_id = ?', [id])
  res.send({ success: true, message: 'User deleted' })
}

usersController.login = async (req, res) => {
  const { user_password, user_email } = req.body

  const users = await pool.query('SELECT * FROM users WHERE user_email = ?', [
    user_email,
  ])

  if (users?.[0]?.user_password == SHA256(user_password)) {
    generateAuthToken(users[0].user_password, res)
    res.json({ success: true, user: users[0] })
  } else {
    res.json({ success: false, message: 'Auth failed' })
  }
}

module.exports = usersController
