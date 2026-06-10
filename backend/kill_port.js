// const { execSync } = require('child_process');

// try {
//   const output = execSync('netstat -ano | findstr :5000').toString();
//   console.log('Connections on port 5000:\n', output);
  
//   // Extract PIDs
//   const lines = output.split('\n').filter(line => line.trim());
//   const pids = new Set();
//   for (const line of lines) {
//     const parts = line.trim().split(/\s+/);
//     if (parts.length >= 5) {
//       const pid = parts[parts.length - 1];
//       pids.add(pid);
//     }
//   }
  
//   console.log('Found PIDs to kill:', Array.from(pids));
//   for (const pid of pids) {
//     if (pid !== '0') {
//       try {
//         console.log(`Killing PID ${pid}...`);
//         execSync(`taskkill /F /PID ${pid}`);
//         console.log(`Successfully killed PID ${pid}`);
//       } catch (e) {
//         console.log(`Could not kill PID ${pid}: ${e.message}`);
//       }
//     }
//   }
// } catch (error) {
//   console.log('No process listening on port 5000 or error:', error.message);
// }
