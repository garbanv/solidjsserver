const { Pool,Client } = require('pg')
//const { user } = require('pg/lib/defaults')

const client = new Client(
    {
        user:process.env.DB_USER,
        host:process.env.DB_HOST,
        database:process.env.DB_NAME,
        password:process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        ssl: false
        //ssl:{ rejectUnauthorized: true }
      }
  )
  client.connect()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));
module.exports = client