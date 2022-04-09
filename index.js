const discord = require('discord.js');
const client = new discord.Client();
const mongoose = require('./database/mongoose')
const config = require("./botconfig/config.json")
const emojis = require("./botconfig/emojis.json")
const Events = require("events");
const OS = require('os');
const fs = require("fs");
const enmap = require("enmap");
const colors = require("colors");
require('dotenv').config();

client.prefix = 'w!';
client.commands = new discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

mongoose.init();
client.login(process.env.TOKEN);