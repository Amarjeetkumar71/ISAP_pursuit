const { Client } = require('pg');
const fs = require('fs');

// const client = new Client({
//   user: 'djay',
//   host: 'localhost',
//   database: 'learn',
//   password: 'veryeasy',
//   port: 5432,
// });

const client = new Client({
  user: 'postgresadmin',
  host: 'postgressapp.postgres.database.azure.com',
  database: 'postgres',
  password: 'Djay@1998',
  port: 5432,
  ssl:{ca:fs.readFileSync('/Users/dhananjay/Downloads/ISAP/ISAP/config/DigiCertGlobalRootCA.crt.pem')}
});

client.connect();

client.on('connect', () => {
  console.log('Connected to PostgreSQL Database.');
});

client.on('end', () => {
  console.log('Connection to PostgreSQL Database ended.');
});

client.on('error', (err) => {
  console.error('Error connecting to PostgreSQL:', err);
});

module.exports = client;
