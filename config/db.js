const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'project',
  password: '12345',
  port: 5432,
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
