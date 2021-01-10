module.exports = {
	run(client, message) {
		if(message.guild.id === client.config.guildID){
			const Discord = require("discord.js");
			const axios = require("axios");
			const member = message.guild.members.cache.get(args[0])
			let notes = args.slice(1).join(' ')
			let MemberRole = message.member.guild.roles.cache.find(r => r.name === client.config.verifiedRoleName);
			if(!MemberRole) return message.channel.send(`❌ The \`${client.config.verifiedRoleName}\` role could not be found.`)
			function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 
			if(message.member.roles.cache.has(client.config.staffRoleName)){
				if(!args[0]) return message.reply(`Please enter a discord user id`)
				if(!isNumber(args[0])) return message.reply(`Please enter a discord user id`)

				message.react('✅').catch(error => { message.channel.send(`❌ There was an error adding the reaction`) })
			
				axios({
					method: 'GET',
					url: `https://verify.eryn.io/api/user/${args[0]}`,
				}).then(function(response) {
		  			if (response.status = 'ok') {
						const embed = new Discord.MessageEmbed()
						.setColor(client.config.acceptedVerificationEmbedColor)
						.setTitle(client.config.botName)
						.setDescription(`You have been verified!\nYou can now fully access the server`)
						if(notes){
							embed.addField('Notes', notes)
						}
						member.send(embed).catch(error => { message.channel.send(`❌ There was an error dming <@${args[0]}`) })
						
						member.roles.add(MemberRole).catch(error => { message.channel.send(`❌ There was an error adding the \`${client.config.verifiedRoleName}\` role.`) })

						member.setNickname(client.config.verifiedPrefix + response.data.robloxUsername, `Verification Accepted`).catch(error => { message.channel.send(`❌ There was an error changing the user's nickname.`) })

						if(notes){
							message.channel.send(`Accepted <@${args[0]}>\nNotes: \`${notes}\``)
						}else{
							message.channel.send(`Accepted <@${args[0]}>`)
						}
					}
				}).catch(function(error) {
					message.channel.send(`❌ I couldnt find a Roblox account linked to <@${args[0]}>, or there was an error.`)
				})
			}else{
			message.reply(`❌ You have have the \`${client.config.staffRoleName}\` to use this command`)
			}
		}
	}
};