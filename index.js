const config = require("./botconfig/config.json")
const emojis = require("./botconfig/emojis.json")
const Events = require("events");
const OS = require('os');
const fs = require("fs");
const enmap = require("enmap");
const colors = require("colors");
require('dotenv').config();

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
	presence: {
		activities: [{ name: `${config.status.text}`.replace("{prefix}", config.prefix), type: config.status.type, url: config.status.url }],
		status: "online"
	  }
  });

client.la = {}
var langs = fs.readdirSync("./languages")
for (const lang of langs.filter(file => file.endsWith(".json"))) {
  client.la[`${lang.split(".json").join("")}`] = require(`./languages/${lang}`)
}
Object.freeze(client.la)
//function "handlemsg(txt, options? = {})" is in /handlers/functions

function requirehandlers() {
	["extraevents", "clientvariables", "command", "events", "erelahandler", "slashCommands"].forEach(handler => {
	  try { require(`./handlers/${handler}`)(client); } catch (e) { console.log(e.stack ? String(e.stack).grey : String(e).grey) }
	});
	
	["aichat"].forEach(handler => {
		try { require(`./handlers/${handler}`)(client); } catch (e) { console.log(e.stack ? String(e.stack).grey : String(e).grey) }
	  });
  } requirehandlers();

client.login(process.env.TOKEN);