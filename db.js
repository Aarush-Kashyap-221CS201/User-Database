const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres', // Replace with your PostgreSQL username
    host: 'localhost', // Replace with your database host
    database: 'test', // Replace with your database name
    password: 'aarushk1511', // Replace with your password
    port: 5432, // Default PostgreSQL port
});

module.exports=pool;