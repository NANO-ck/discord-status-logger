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
  if(!id || !webhook || !webhook.id|| !webhook.token || !client) return log("error", "Invalid user config")
  const user = await client.users.fetch(id)
  if(!user) return log("error", "Couldn't find user with ID " + id)
  const mutualGuild = await client.guilds.cache.filter(x => x.members.fetch(id).then(() => true).catch(() => false)).first()
  if(!mutualGuild || !mutualGuild.name) return log("error", "No mutual guild with user ID "+id)
  const member = await mutualGuild.members.fetch(id)
  if(!member) return log("error", "An unexpected error occured while attempting to get member of mutual guild with ID "+id+". This may be an error with the cache.")
  const channel = new WebhookClient(webhook)
  if(!channel.send({content: "✅ Successfully watching on "+user.tag}).then(() => true).catch(()  => false)) return log("error", "Invalid webhook creditentials for user with ID " + id)
  log("log", "Successfully watching on " + user.tag)
  
  let status = member.presence.status
  
  channel.send({embeds:[{
    title: status[status].text,
    description: `Device(s): Object.entries(member.presence.clientStatus).map(x => x[0]).join(", ")`,
    color: status[status].color,
    timestamp: Date.now()
  }]})
  setInterval(function(){
      const currentStatus = member.presence.status
      if(status !== currentStatus) {
        channel.send({embeds:[{
          title: status[status].text,
          description: `Device(s): Object.entries(member.presence.clientStatus).map(x => x[0]).join(", ")`,
          color: status[status].color,
          timestamp: Date.now()
        }]})
        status = currentStatus        
      }
  }, 2500);
}
