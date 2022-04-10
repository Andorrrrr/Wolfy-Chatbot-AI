const Discord = require('discord.js');
const client = new Discord.Client({
	fetchAllMembers: false,
	restTimeOffset: 0,
	failIfNotExists: false,
	shards: "auto",
	allowedMentions: {
	  parse: ["roles", "users"],
	  repliedUser: false,
	},
	partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
	intents: [Discord.Intents.FLAGS.GUILDS,
	Discord.Intents.FLAGS.GUILD_MEMBERS,
	Discord.Intents.FLAGS.GUILD_BANS,
	Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
	Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
	Discord.Intents.FLAGS.GUILD_WEBHOOKS,
	Discord.Intents.FLAGS.GUILD_INVITES,
	Discord.Intents.FLAGS.GUILD_VOICE_STATES,
	Discord.Intents.FLAGS.GUILD_PRESENCES,
	Discord.Intents.FLAGS.GUILD_MESSAGES,
	Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	//Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
	Discord.Intents.FLAGS.DIRECT_MESSAGES,
	Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
	  //Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
	],

  });
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
client.commands = new Discord.Collection();

client.presence = {
	activities: [{ name: `${config.status.text}`.replace("{prefix}", config.prefix), type: config.status.type, url: config.status.url }],
	status: "online"
  };

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