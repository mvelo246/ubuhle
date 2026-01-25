require('dotenv').config();
const { Sequelize } = require('sequelize');

const dbPassword = process.env.DB_PASSWORD || '';
const dbUser = process.env.DB_USER || 'postgres';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '5432';
const dbName = process.env.DB_NAME || 'ubuhle';

// Connect to default postgres database to create new database
const adminSequelize = new Sequelize(
  'postgres',
  dbUser,
  dbPassword,
  {
    host: dbHost,
    port: parseInt(dbPort),
    dialect: 'postgres',
    logging: console.log,
  }
);

async function createDatabase() {
  try {
    console.log(`Creating database '${dbName}'...`);
    
    // Create database
    await adminSequelize.query(`CREATE DATABASE "${dbName}";`);
    
    console.log(`✓ Database '${dbName}' created successfully!`);
    
    await adminSequelize.close();
    process.exit(0);
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log(`✓ Database '${dbName}' already exists.`);
      process.exit(0);
    } else {
      console.error('✗ Error creating database:', error.message);
      process.exit(1);
    }
  }
}

createDatabase();
