// src/event.js

// This file is triggered whenever a user has an event (connect, disconnect, statusUpdate, or deviceUpdate)

const log = require("./log.js")

module.exports = (event, user, channel, status, devices) => {
  if(!event || !user || !user.tag || !channel || !status || !devices) return log("error", "Missing variable in event.js")
  if(!["connect", "disconnect", "statusUpdate", "deviceUpdate"].includes(event)) return log("error", "Incorrect event type in event.js")
  
  channel.send({embeds:[{
          title: status[status].text,
          description: `Device(s): Object.entries(member.presence.clientStatus).map(x => x[0]).join(", ")`,
          color: status[status].color,
          timestamp: Date.now()
        }]})
}
