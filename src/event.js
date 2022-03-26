// src/event.js

// This file is triggered whenever a user has an event (connect, disconnect, or deviceUpdate)

const log = require("./log.js")

module.exports = (event, user, channel, status, devices) => {
  if(!event || !user || !user.tag || !channel || !status || !devices) return log("error", "Missing variable in event.js")
  if(!["connect", "disconnect", "deviceUpdate"].includes(event)) return log("error", "Incorrect event type in event.js")
  
  
}
