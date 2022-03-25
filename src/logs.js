// src/logs.js

// A function used instead of the console.log, to allow us to log to Discord at the same time, and select colors

module.exports = (type, message) => {
  console[type](message)
}
