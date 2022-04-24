const {
    MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu
  } = require("discord.js")
  const config = require(`${process.cwd()}/botconfig/config.json`);
  var ee = require(`${process.cwd()}/botconfig/embed.json`);
  const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
 
  module.exports = {
    name: "help",
    category: "🔰 Info",
    aliases: ["h", "commandinfo", "halp", "hilfe"],
    usage: "help [Command/Category]",
    description: "Returns all Commmands, or one specific command",
    type: "bot",
    run: async (client, message, args, cmduser, text, prefix) => {
  
      let settings = client.settings.get(message.guild.id);
      let es = client.settings.get(message.guild.id, "embed");
      let ls = client.settings.get(message.guild.id, "language");
  
      try {
        if (args[0]) {
          const embed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null);
          const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
          var cat = false;
          if (args[0].toLowerCase().includes("cust")) {
            let cuc = client.customcommands.get(message.guild.id, "commands");
            if (cuc.length < 1) cuc = [handlemsg(client.la[ls].cmds.info.help.error1)]
            else cuc = cuc.map(cmd => `\`${cmd.name}\``)
            const items = cuc
  
  
            const embed = new MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
              .setThumbnail(client.user.displayAvatarURL())
              .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable1"]))
              .setDescription(items.join("︲"))
              .setFooter(handlemsg(client.la[ls].cmds.info.help.nocustom), client.user.displayAvatarURL());
  
            message.reply({ embeds: [embed] })
            return;
          } var cat = false;
          if (!cmd) {
            cat = client.categories.find(cat => cat.toLowerCase().includes(args[0].toLowerCase()))
          }
          if (!cmd && (!cat || cat == null)) {
            return message.reply({ embeds: [embed.setColor(es.wrongcolor).setDescription(handlemsg(client.la[ls].cmds.info.help.noinfo, { command: args[0].toLowerCase() }))] });
          } else if (cat) {
            var category = cat;
            const items = client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
            const embed = new MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
              .setThumbnail(client.user.displayAvatarURL())
              .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable2"]))
              .setFooter(handlemsg(client.la[ls].cmds.info.help.nocustom, { prefix: prefix }), client.user.displayAvatarURL());
            let embeds = allotherembeds_eachcategory();
            if (cat == "🔰 Info")
              return message.reply({ embeds: [embeds[0]] })
            if (cat == "💸 Setup")
              return message.reply({ embeds: [embeds[1]] })
            if (cat == "🏫 Fun")
              return message.reply({ embeds: [embeds[2]] })
          }
          if (cmd.name) embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.name), `\`\`\`${cmd.name}\`\`\``);
          if (cmd.name) embed.setTitle(handlemsg(client.la[ls].cmds.info.help.detail.about, { cmdname: cmd.name }));
          if (cmd.description) embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.desc), `\`\`\`${cmd.description}\`\`\``);
          if (cmd.aliases && cmd.aliases.length > 0 && cmd.aliases[0].length > 1) try {
            embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.aliases), `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
          } catch { }
          if (cmd.cooldown) embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.cooldown), `\`\`\`${cmd.cooldown} Seconds\`\`\``);
          else embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.cooldown), `\`\`\`3 Seconds\`\`\``);
          if (cmd.usage) {
            embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.usage), `\`\`\`${prefix}${cmd.usage}\`\`\``);
            embed.setFooter(handlemsg(client.la[ls].cmds.info.help.detail.syntax), es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL());
          }
          return message.reply({ embeds: [embed] });
        } else {
          let button_back = new MessageButton().setStyle('SUCCESS').setCustomId('1').setEmoji("967854679201570816").setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.back))
          let button_home = new MessageButton().setStyle('DANGER').setCustomId('2').setEmoji("🏠").setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.home))
          let button_forward = new MessageButton().setStyle('SUCCESS').setCustomId('3').setEmoji('967854679235104849').setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.forward))
          let button_tutorial = new MessageButton().setStyle('LINK').setEmoji("967854122885845073").setLabel("Support Server").setURL("https://discord.gg/5dzjAkEKFQ")
          let menuOptions = [
            {
              label: "Overview",
              value: "Overview",
              emoji: "833101995723194437",
              description: "The Overview of me!"
            },
            {
              label: "Information",
              value: "Information",
              emoji: "🔰",
              description: "Commands to Information"
            },
            {
              label: "Setup",
              value: "Setup",
              emoji: "💪",
              description: "Commands to Setup Systems"
            },
            {
              label: "Fun",
              value: "Fun",
              emoji: "🕹️",
              description: "Commands for Fun"
            },
          ];
          menuOptions = menuOptions.map(i => {
            if (settings[`${i?.value.toUpperCase()}`] === undefined) {
              return i; //if its not in the db, then add it
            }
            else if (settings[`${i?.value.toUpperCase()}`]) {
              return i; //If its enabled then add it
            }
            else if (settings.showdisabled && settings[`${i?.value.toUpperCase()}`] === false) {
              return i;
            } else {
              //return i // do not return, cause its disabled! to be shown
            }
          })
          let menuSelection = new MessageSelectMenu()
            .setCustomId("MenuSelection")
            .setPlaceholder("Click me to view Help-Menu-Category-Page(s)")
            .setMinValues(1)
            .setMaxValues(5)
            .addOptions(menuOptions.filter(Boolean))
          let buttonRow = new MessageActionRow().addComponents([button_back, button_home, button_forward, button_tutorial])
          let SelectionRow = new MessageActionRow().addComponents([menuSelection])
          const allbuttons = [buttonRow, SelectionRow]
          //define default embed
          let OverviewEmbed = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
            //.setFooter("Page Overview\n"+ client.user.username, client.user.displayAvatarURL())
            .setFooter({ text: "Page Overview\n" + client.user.username, iconURL: client.user.displayAvatarURL() })
            .setTitle(`Information about __${client.user.username}__`)
            .addField("**__About Me__**",
              `>>> Hi! My name is **Wolfy Chatbot**, an AI chatbot created by __**Wolfy Development**__! I also got some fun commands, Check those out!`)
            .addField(":question: **__How do you use me?__**",
              `>>> \`${prefix}setup\` and react with the emoji for the right action,
  but you can also do \`${prefix}setup-SYSTEM\` e.g. \`${prefix}setup-aichat\``)
            .addField(":chart_with_upwards_trend: **__STATS:__**",
              `>>> :gear: **${client.commands.map(a => a).length} Commands**
  :file_folder: on **${client.guilds.cache.size} Guilds**
  ⌚️ **${duration(client.uptime).map(i => `\`${i}\``).join("︲")} Uptime**
  📶 **\`${Math.floor(client.ws.ping)}ms\` Ping**
  <<:Discord:967854122885845073>  Made by [**Wolfy Developemnt**](https://discord.gg/5dzjAkEKFQ)`)
            .addField("How to get help?", `>>> **\` 1. Way \`** *Use the Buttons, to swap the Pages*\n**\` 2. Way \`** *Use the Menu to select all Help Pages, you want to display*`)
  
          let err = false;
          //Send message with buttons
          let helpmsg = await message.reply({
            content: `***Click on the __Buttons__ to swap between the Help-Pages***`,
            embeds: [OverviewEmbed],
            components: allbuttons
          }).catch(e => {
            err = true;
            console.log(e.stack ? String(e.stack).grey : String(e).grey)
            return message.reply(`:x: I couldn't send help? Maybe I am missing the Permission to **EMBED LINKS**`).catch(() => { })
          });
          if (err) return;
          var edited = false;
          var embeds = [OverviewEmbed]
          for (const e of allotherembeds_eachcategory(true))
            embeds.push(e)
          let currentPage = 0;
  
          //create a collector for the thinggy
          const collector = helpmsg.createMessageComponentCollector({ filter: (i) => (i?.isButton() || i?.isSelectMenu()) && i?.user && i?.message.author.id == client.user.id, time: 180e3 });
          //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
          collector.on('collect', async b => {
            try {
              if (b?.isButton()) {
                if (b?.user.id !== message.author.id)
                  return b?.reply({ content: handlemsg(client.la[ls].cmds.info.help.buttonerror, { prefix: prefix }), ephemeral: true });
  
                //page forward
                if (b?.customId == "1") {
                  //b?.reply("***Swapping a PAGE FORWARD***, *please wait 2 Seconds for the next Input*", true)
                  if (currentPage !== 0) {
                    currentPage -= 1
                  } else {
                    currentPage = embeds.length - 1
                  }
                }
                //go home
                else if (b?.customId == "2") {
                  //b?.reply("***Going Back home***, *please wait 2 Seconds for the next Input*", true)
                  currentPage = 0;
                }
                //go forward
                else if (b?.customId == "3") {
                  //b?.reply("***Swapping a PAGE BACK***, *please wait 2 Seconds for the next Input*", true)
                  if (currentPage < embeds.length - 1) {
                    currentPage++;
                  } else {
                    currentPage = 0
                  }
                }
                await helpmsg.edit({ embeds: [embeds[currentPage]], components: allbuttons }).catch(e => { })
                b?.deferUpdate().catch(e => { })
  
  
              }
              if (b?.isSelectMenu()) {
                //b?.reply(`***Going to the ${b?.customId.replace("button_cat_", "")} Page***, *please wait 2 Seconds for the next Input*`, true)
                //information, music, admin, settings, voice, minigames, nsfw
                let index = 0;
                let vembeds = []
                let theembeds = [OverviewEmbed, ...allotherembeds_eachcategory()];
                for (const value of b?.values) {
                  switch (value.toLowerCase()) {
                    case "overview": index = 0; break;
                    case "information": index = 1; break;
                    case "setup": index = 8; break;
                    case "fun": index = 15; break;
                  }
                  vembeds.push(theembeds[index])
                }
                b?.reply({
                  embeds: vembeds,
                  ephemeral: true
                });
              }
            } catch (e) {
              console.log(e.stack ? String(e.stack).grey : String(e).grey)
              console.log(String(e).italic.italic.grey.dim)
            }
          });
  
          collector.on('end', collected => {
            //array of all disabled buttons
            let d_buttonRow = new MessageActionRow().addComponents([button_back.setDisabled(true), button_home.setDisabled(true), button_forward.setDisabled(true), button_tutorial])
            const alldisabledbuttons = [d_buttonRow]
            if (!edited) {
              edited = true;
              helpmsg.edit({ content: handlemsg(client.la[ls].cmds.info.help.timeended, { prefix: prefix }), embeds: [helpmsg.embeds[0]], components: alldisabledbuttons }).catch((e) => { })
            }
          });
        }
        function allotherembeds_eachcategory(filterdisabled = false) {
          //ARRAY OF EMBEDS
          var embeds = [];
  
          //INFORMATION COMMANDS
          var embed0 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🔰 Info").size}\`] 🔰 Information Commands 🔰`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🔰 Info").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField(`🙂 **User Commands**`, ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "user").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField(`🕹️ **Games Related Commands**`, ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "games").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField(`<:Discord:787321652345438228> **Server Related Commands**`, ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "server").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField(`<:Bot_Flag:835928340715012137> **Bot Related Commands**`, ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "bot").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField(`<:Builder:866089513654419466> **Util Related Commands**`, ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "util").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          embeds.push(embed0)
  
          //SETUP
          var embed7 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "💪 Setup").size}\`] 💪 Setup Commands 💪`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "💪 Setup").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField("😛 **Setups for Entertainment**", "> " + client.commands.filter((cmd) => cmd.category === "💪 Setup" && cmd.type.includes("fun")).sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField("💡 **Information & Manage (Bot/Server) Settings**", "> " + client.commands.filter((cmd) => cmd.category === "💪 Setup" && cmd.type.includes("info")).sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField("<:MilratoDevelopment:900389724936609842> **Most used Systems**", "> " + client.commands.filter((cmd) => cmd.category === "💪 Setup" && cmd.type.includes("system")).sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField("<:Builder:866089513654419466> **Security Systems**", "> " + client.commands.filter((cmd) => cmd.category === "💪 Setup" && cmd.type.includes("security")).sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          embeds.push(embed7)
          //FUN COMMANDS
          var embed14 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🕹️ Fun").size}\`] 🕹️ Fun Commands 🕹️ | ${settings.FUN ? "<a:yes:833101995723194437> ENABLED" : "<:no:833101993668771842> DISABLED"}`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🕹️ Fun").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField("🙂 **Fun User Image Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🕹️ Fun" && cmd.type === "user").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField("🙂💬 **Fun User Image-Text Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🕹️ Fun" && cmd.type === "usertext").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField("💬 **Fun Text Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🕹️ Fun" && cmd.type === "text").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          if (!filterdisabled || settings.FUN || settings.showdisabled) embeds.push(embed14)

          return embeds.map((embed, index) => {
            return embed
              .setColor(es.color)
              .setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
              .setFooter(client.getFooter(`Page ${index + 1} / ${embeds.length}\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL()));
          })
        }
      } catch (e) {
        console.log(String(e.stack).grey.bgRed)
        return message.reply({
          embeds: [new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(client.getFooter(es))
            .setTitle(client.la[ls].common.erroroccur)
            .setDescription(eval(client.la[ls]["cmds"]["info"]["color"]["variable2"]))
          ]
        });
      }
    }
  }