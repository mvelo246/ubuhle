require('dotenv').config();
const { Sequelize } = require('sequelize');

// Read password directly
const dbPassword = process.env.DB_PASSWORD || '';
console.log('Password from .env:', dbPassword ? `${dbPassword.substring(0, 3)}***` : 'EMPTY');
console.log('Password length:', dbPassword.length);

const dbName = process.env.DB_NAME || 'ubuhle';
const dbUser = process.env.DB_USER || 'postgres';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '5432';

// Try to connect to PostgreSQL server (not specific database)
const adminSequelize = new Sequelize(
  'postgres', // Connect to default postgres database
  dbUser,
  dbPassword,
  {
    host: dbHost,
    port: parseInt(dbPort),
    dialect: 'postgres',
    logging: false,
  }
);

async function checkDatabase() {
  try {
    console.log('\n=== Checking PostgreSQL Connection ===');
    console.log(`Host: ${dbHost}:${dbPort}`);
    console.log(`User: ${dbUser}`);
    console.log(`Database to check: ${dbName}`);
    
    // Test connection to PostgreSQL server
    await adminSequelize.authenticate();
    console.log('✓ Connected to PostgreSQL server successfully');
    
    // Check if database exists
    const [results] = await adminSequelize.query(
      `SELECT 1 FROM pg_database WHERE datname = '${dbName}'`
    );
    
    if (results.length > 0) {
      console.log(`✓ Database '${dbName}' EXISTS`);
    } else {
      console.log(`✗ Database '${dbName}' DOES NOT EXIST`);
      console.log(`\nTo create it, run:`);
      console.log(`  CREATE DATABASE ${dbName};`);
    }
    
    await adminSequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('\n✗ Error:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\nPostgreSQL server is not running or not accessible.');
      console.log('Please start PostgreSQL service or install PostgreSQL.');
    } else if (error.message.includes('password authentication failed')) {
      console.log('\nPassword authentication failed. Check your DB_PASSWORD in .env file.');
    } else if (error.message.includes('does not exist')) {
      console.log(`\nDatabase '${dbName}' does not exist.`);
    }
    
    process.exit(1);
  }
}

checkDatabase();
