module.exports = async (client, message) => {
    try {
        if (!message.guild || message.guild.available === false || !message.channel || message.webhookId) return
        if (message.author.bot) return
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
        if (!prefixRegex.test(message.content)) return
        const [, matchedPrefix] = message.content.match(prefixRegex);
        if(!message.guild.me.permissions.has(Discord.Permissions.FLAGS.USE_EXTERNAL_EMOJIS))
           return message.reply(`:x: **I am missing the Permission to USE EXTERNAL EMOJIS**`).catch(()=>{})
        if(!message.guild.me.permissions.has(Discord.Permissions.FLAGS.EMBED_LINKS))
           return message.reply(`<:no:833101993668771842> **I am missing the Permission to EMBED LINKS (Sending Embeds)**`).catch(()=>{})
        if(!message.guild.me.permissions.has(Discord.Permissions.FLAGS.ADD_REACTIONS))
           return message.reply(`<:no:833101993668771842> **I am missing the Permission to ADD REACTIONS**`).catch(()=>{})

           const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    //creating the cmd argument by shifting the args by 1
    const cmd = args.shift()?.toLowerCase();
    //if no cmd added return error
    if (cmd.length === 0) {
      if (matchedPrefix.includes(client.user.id))
        return message.reply({embeds: [new Discord.MessageEmbed()
          .setColor(es.color)
          .setTitle(handlemsg(client.la[ls].common.ping, {prefix: prefix}))]}).catch(()=>{});
      return;
    }
} catch {
    console.error();
}
}