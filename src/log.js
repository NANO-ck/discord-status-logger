// src/logs.js

// A function used instead of the console.log, to allow us to log to Discord at the same time, and select colors

const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    reset: '\x1b[0m'
}
console.log(`Running ${colors.yellow}${process.version}${colors.green}${colors.reset}`);

module.exports = (type, message) => {
  console[type](message)
}
