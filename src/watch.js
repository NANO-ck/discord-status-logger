// src/watch.js

// This file is triggered for each user entered in the config.js

const { WebhookClient } = require("discord.js")
const log = require("./log.js")
const config = require("../config.js")
const event = require("./event.js")

function equalArrays(firstArray, secondArray) {
   if(!Array.isArray(firstArray) || !Array.isArray(secondArray) || firstArray.length !== secondArray.length) return false
   const tempFirstArray = firstArray.concat().sort();
   const tempSecondArray = secondArray.concat().sort();
   for (let i = 0; i < tempFirstArray.length; i++) {
      if (tempFirstArray[i] !== tempSecondArray[i])
         return false;
   }
   return true;
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
  let devices = Object.entries(member.presence.clientStatus).map(x => x[0])
  console.table({status: status, devices: devices})
  
  setInterval(() => {
   if((status == member.presence.status) && equalArrays(devices, Object.entries(member.presence.clientStatus).map(x => x[0]))) return // Nothing changed since last time
   if(status != member.presence.status) { // Status Changed
      status = member.presence.status
      devices = Object.entries(member.presence.clientStatus).map(x => x[0])
      event("statusUpdate", user, channel, status, devices)
   } else if(!equalArrays(devices, Object.entries(member.presence.clientStatus).map(x => x[0]))) { // User devices changed
      status = member.presence.status
      devices = Object.entries(member.presence.clientStatus).map(x => x[0])
      event("deviceUpdate", user, channel, status, devices)
   } else {
      log("error", "Something went wrong watch.js line 59")
   }
  }, config.interval*1000)
}
