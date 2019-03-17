const { execSync } = require('child_process');
const fs = require('fs');
// execute commands in the terminal
execSync(cmd, { stdio: 'inherit' });
