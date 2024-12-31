require('dotenv').config();

const { Pool } = require('pg');
const { Client } = require("pg");

const SQL = `
    CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ),
    age INTEGER
    );
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Allows self-signed certificates if needed
    },
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Allows self-signed certificates if needed
    },
});

main();

module.exports=pool;