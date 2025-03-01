const { spawn } = require('child_process');

const service = spawn('node', ['./web-service/service.js'], { stdio: 'inherit' });
const next = spawn('next', ['dev', '--turbopack'], { stdio: 'inherit' });

service.on('close', (code) => {
  console.log(`service.js process exited with code ${code}`);
});

next.on('close', (code) => {
  console.log(`next dev process exited with code ${code}`);
});