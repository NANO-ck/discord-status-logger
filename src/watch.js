// src/watch.js

// This file is triggered for each user entered in the config.js

const discord = require("discord.js")
const client = require("../index.js")
const log = require("log.js")

module.exports = async ({id, webhook}) => {
  const user = await client.users.fetch(id)
  if(!user) return log("error", "Couldn't find user with ID " + id)
  log("log", "Successfully watching on " + user.tag)
  
}
