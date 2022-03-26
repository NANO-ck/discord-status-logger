// src/event.js

// This file is triggered whenever a user has an event (connect, disconnect, statusUpdate, or deviceUpdate)

const log = require("./log.js")
const fs = require("fs")

const embed = {
  dnd: {text: "⛔ Do Not Disturb", color: 0xFF0000},
  idle: {text: "🌙 Idle", color: 0xFFEE00},
  online: {text: "🟢 Online", color: 0x0DFF00},
  offline: {text: "⚫ Offline", color: 0x787878},
}

module.exports = async (event, user, channel, status, devices) => {
  if(!event || !user || !user.tag || !channel || !status || !devices) return log("error", "Missing variable in event.js")
  if(!["statusUpdate", "deviceUpdate"].includes(event)) return log("error", "Incorrect event type in event.js")
    
  channel.send({embeds:[{ // Sending message to the specified status channel for this user
    title: embed[status].text,
    description: `Device(s): ${devices.length == 0 ? "None" : devices.join(", ")}`,
    color: embed[status].color,
    timestamp: Date.now()
  }]})

  // Saving data to JSON file
    
    if(!fs.existsSync("./src/db/activity-"+user.id+".json")) {
   		await fs.promises.appendFile("./src/db/activity-"+user.id+".json", "[]", 'utf8', function(err) {
  			if (err) return console.log(err);
		});
   	}
    
  	await delete require.cache[require.resolve("./db/activity-"+user.id+".json")]
	let activity = require("./db/activity-"+user.id+".json")
    activity.push({date: Math.floor(+new Date() / 1000), status: status, devices: devices})
    fs.writeFile("./src/db/activity-"+user.id+".json", JSON.stringify(activity), function(err) {
  		if (err) return console.error(err);
	});
}
