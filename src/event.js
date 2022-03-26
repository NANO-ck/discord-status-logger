// src/event.js

// This file is triggered whenever a user has an event (connect, disconnect, statusUpdate, or deviceUpdate)

const log = require("./log.js")

const embed = {
  dnd: {text: "⛔ Do Not Disturb", color: 0xFF0000},
  idle: {text: "🌙 Idle", color: 0xFFEE00},
  online: {text: "🟢 Online", color: 0x0DFF00},
  offline: {text: "⚫ Offline", color: 0x787878},
}

module.exports = (event, user, channel, status, devices) => {
  if(!event || !user || !user.tag || !channel || !status || !devices) return log("error", "Missing variable in event.js")
  if(!["statusUpdate", "deviceUpdate"].includes(event)) return log("error", "Incorrect event type in event.js")
  
  channel.send({embeds:[{
    title: embed[status].text,
    description: `Device(s): ${devices.length == 0 ? "None" : devices.join(", ")}`,
    color: embed[status].color,
    timestamp: Date.now()
  }]})

}
