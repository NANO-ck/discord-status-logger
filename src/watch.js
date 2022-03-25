// src/watch.js

// This file is triggered for each user entered in the config.js

const { WebhookClient } = require("discord.js")
const log = require("./log.js")

const status = {
  dnd: {text: "⛔ Do Not Disturb", color: 0xff6600},
  idle: {text: "🌙 Idle", color: 0xff6600},
  online: {text: "🟢 Online", color: 0xff6600},
  offline: {text: "⚫ Offline", color: 0xff6600},
}

module.exports = async ({id, webhook}, client) => {
  const user = await client.users.fetch(id)
  if(!user) return log("error", "Couldn't find user with ID " + id)
  const channel = new WebhookClient(webhook)
  if(!channel.send({content: "✅ Successfully watching on "+user.tag}).then(() => true).catch(()  => false)) return log("error", "Invalid webhook creditentials for user with ID " + id)
  log("log", "Successfully watching on " + user.tag)
  
  let status = user.presence.status
  
  channel.send({embeds:[{
    title: status[status].text,
    description: `Device(s): Object.entries(user.presence.clientStatus).map(x => x[0]).join(", ")`,
    color: status[status].color,
    timestamp: Date.now()
  }]})
  setInterval(function(){
      const currentStatus = user.presence.status
      if(status !== currentStatus) {
        channel.send({embeds:[{
          title: status[status].text,
          description: `Device(s): Object.entries(user.presence.clientStatus).map(x => x[0]).join(", ")`,
          color: status[status].color,
          timestamp: Date.now()
        }]})
        status = currentStatus        
      }
  }, 2500);
}
