const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  user: 'postgres',
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  port: 5432,
  database: 'node_postgres',
})

module.exports = pool
