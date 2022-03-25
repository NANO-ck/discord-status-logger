// index.js

const { Client, Intents } = require('discord.js')
const { readdirSync } = require('fs')
const log = require("./src/log.js")
const config = require("./config.js")
const watch = require("./src/watch.js")

log("log", "Launching the bot...", true)
log("log", `Running NodeJS ${process.version}`);

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: 513 }) // https://ziad87.net/intents/ to calculate intents

/* 
Partials: 
USER
CHANNEL (only DM channels can be uncached, server channels will always be available)
GUILD_MEMBER
MESSAGE
REACTION
*/

client.login(config.token).then(() => {
	module.exports =  client
	log("log", `Connected to ${client.user.tag}`, true)
	log(client.guilds.cache.size == 0 ? "error" : "log", client.guilds.cache.size + " guilds")
	log("log", "Invite the bot using this link: https://discord.com/oauth2/authorize?scope=bot&permissions=8&client_id="+client.user.id)
	config.users.map(user => {
		watch(user, client)
	})
	log("log", "Watching on "+config.users.length+" users", true)
})

