#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Ubuhle Bekonjana Application...\n');

// Start backend
console.log('📦 Starting backend server...');
const backend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit',
  shell: true
});

// Wait a moment, then start frontend
setTimeout(() => {
  console.log('⚛️  Starting frontend server...\n');
  const frontend = spawn('npm', ['run', 'dev'], {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true
  });

  console.log('✅ Both servers are running!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Backend:  http://localhost:5000');
  console.log('  Frontend: http://localhost:5173');
  console.log('  API:      http://localhost:5000/api');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('Press Ctrl+C to stop both servers\n');

  // Handle cleanup
  const cleanup = () => {
    console.log('\n🛑 Stopping servers...');
    backend.kill();
    frontend.kill();
    process.exit();
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  // Handle process errors
  backend.on('error', (err) => {
    console.error('Backend error:', err);
  });

  frontend.on('error', (err) => {
    console.error('Frontend error:', err);
  });
}, 2000);

// Handle backend exit
backend.on('exit', (code) => {
  if (code !== null && code !== 0) {
    console.error(`Backend exited with code ${code}`);
  }
});
