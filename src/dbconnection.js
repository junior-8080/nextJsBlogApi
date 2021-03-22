const {Pool} = require('pg');
require('dotenv').config()

const pool = new Pool({
    user:'postgres',
    host: process.env.HOST || 'localhost',
    database: process.env.DATABASE || 'demo_api',
    password: process.env.PASSWORD || 'myPassword1',
    port: process.env.DB_PORT  || 5432
})

module.exports = pool;