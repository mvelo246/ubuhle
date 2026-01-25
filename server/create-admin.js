require('dotenv').config();
const User = require('./models/User');
const { sequelize } = require('./config/database');

async function createAdmin() {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('Connected to database');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email: 'admin@ubuhle.com' } });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: admin@ubuhle.com');
      console.log('You can login with this email and your password.');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      username: 'admin',
      email: 'admin@ubuhle.com',
      password: 'admin123', // Default password - change this after first login!
      role: 'admin',
    });

    console.log('✓ Admin user created successfully!');
    console.log('\nLogin credentials:');
    console.log('Email: admin@ubuhle.com');
    console.log('Password: admin123');
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');
    
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
}

createAdmin();
