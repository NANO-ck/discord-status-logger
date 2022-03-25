// index.js

const { Client, Intents } = require('discord.js')
const { readdirSync } = require('fs')
const log = require("src/log.js")

log("log", "Launching the bot...")

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: 5635 }) // https://ziad87.net/intents/ to calculate intents

/* 
Partials: 
USER
CHANNEL (only DM channels can be uncached, server channels will always be available)
GUILD_MEMBER
MESSAGE
REACTION
*/

client.config = require("./config.json")

/**
 * # Events handler
 * Petit script qui chargera le fichier index.js de tout les event inscrit dans le dossier events
 */

console.log("\nChargement des évenements\n\n###############\n")
readdirSync('./events').forEach((event) => {
	const index = require(`./events/${event}/index.js`)
	client.on(event, (...params) => index({ client, params }))
	console.log(`Évenement ${event} chargé!`)
})
console.log("\nTous les évènements ont étés chargés!\n\n###############\n")

console.log("Chargement des commandes\n\n###############\n")
client.commands = []
readdirSync('./events/messageCreate/commands').map((file) => {
	const cmd = require(`./events/messageCreate/commands/${file}`)
	client.commands.push(cmd)
	console.log(`Commande ${cmd.config.name} chargée!`)
})
console.log(`\nTotal: ${client.commands.length} commandes\n###############\n`)

client.login(client.config.token).then(() => {module.exports =  client})

