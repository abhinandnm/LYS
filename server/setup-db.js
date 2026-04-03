const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

async function setupDatabase() {
  try {
    console.log('⏳ Connecting to Database...', process.env.DB_HOST);
    const sqlScript = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf-8');
    
    console.log('⏳ Running init.sql script to create tables and seed data...');
    await pool.query(sqlScript);
    
    console.log('✅ Database Initialization Complete!');
  } catch (err) {
    console.error('❌ Error setting up database:', err);
  } finally {
    await pool.end();
  }
}

setupDatabase();
