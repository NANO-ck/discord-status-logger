// config.js

module.exports = {
  token: "", // The Discord Bot Token, get it from Discord Developer Portal /!\ Make sure you activate the intents for the bot
  statusChannel: "", // A webhook to which the bot will send global infos (same infos as the console)
  interval: 60, // How many seconds should we wait before checking the user's presence once again and again?
  users: [ // Users you want to monitor
    {id: "", webhook: {id: "webhook ID", token: "webhook Token" }} // Provide the user ID and a Discord webhook to post messages whenever the user connects or disconnects
  ]
}
