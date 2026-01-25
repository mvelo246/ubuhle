const { Sequelize } = require('sequelize');

// Create Sequelize instance
// Read values directly from process.env (dotenv should be loaded in server.js before this)
const dbName = process.env.DB_NAME || 'ubuhle';
const dbUser = process.env.DB_USER || 'postgres';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = parseInt(process.env.DB_PORT || '5432', 10);

// Ensure password is a string - handle undefined/null/empty
let dbPassword = '';
if (process.env.DB_PASSWORD) {
  dbPassword = String(process.env.DB_PASSWORD).trim();
}

// Encode password for URI (handles special characters like !@)
const encodedPassword = encodeURIComponent(dbPassword);

// Build connection URI
const connectionUri = `postgresql://${dbUser}:${encodedPassword}@${dbHost}:${dbPort}/${dbName}`;

const sequelize = new Sequelize(connectionUri, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  dialectOptions: {
    // Use TCP/IP instead of Unix socket
    connectTimeout: 60000,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Test connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Connected Successfully');
    
    // Sync models (in development, use { alter: true } or { force: true } carefully)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database models synchronized');
    }
  } catch (error) {
    console.error('Unable to connect to PostgreSQL:', error.message);
    // Throw error instead of exiting, so server can handle it
    throw error;
  }
};

module.exports = { sequelize, connectDB };
