// src/logs.js

// A function used instead of the console.log, to allow us to log to Discord at the same time, and select colors

const discord = require("discord.js")
const { statusChannel } = require("../config.js")
const colors = {
    error: '\x1b[31m',
    warn: '\x1b[33m',
    log: '\x1b[0m'
}

module.exports = (type, message, success) => {
  console[type]((success ? '\x1b[32m' : colors[type]) + message)
}
