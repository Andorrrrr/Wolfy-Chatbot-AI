const Discord = require("discord.js");
const fs = require("fs")
const config = require(`${process.cwd()}/botconfig/config.json`);
const ee = require(`${process.cwd()}/botconfig/embed.json`);
module.exports = (client) => {
  /**
   * @INFO
   * This will be all of our CLIENT VARIABLES for the commands as well as a cooldown system for each cmd!
   */
  client.invites = {};
  client.commands = new Discord.Collection(); //an collection (like a digital map(database)) for all your commands
  client.aliases = new Discord.Collection(); //an collection for all your command-aliases
  client.slashCommands = new Discord.Collection(); //an collection for all the slash Commands
  fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);
    else {
      client.categories = files
    }
  }); //load the categories asynchronusly
  client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user
  client.getInvite = async (id) => {
    if (!id || id.length != 18) return "INVALID CHANNELID";
    let ch = await client.channels.fetch("802914917874663454").catch(() => { })
    if (!ch) return `COULD NOT CREATE INVITE FOR: <#802914917874663454> in **${ch.guild.name}**`
    if (!ch.permissionsFor(ch.guild.me).has(Discord.Permissions.FLAGS.CREATE_INSTANT_INVITE)) {
      return `:x: **I am missing the CREATE_INSTANT_INVITE PERMISSION for \`${ch.name}\`**`
    }
    let inv = await ch.createInvite();
    if (!inv) return `COULD NOT CREATE INVITE FOR: <#802914917874663454> in **${ch.guild.name}**`
    return `<#802914917874663454> | discord.gg/${inv.code}`
  }}