module.exports = {
	run(client, message, args) {
		if(message.guild.id === client.config.guildID){
			const Discord = require("discord.js");
			const axios = require("axios");
			function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 
			const member = message.guild.members.cache.get(args[0])
			let reason = args.slice(1).join(' ') || 'No reason provided'
			//Staff Role
			let staffRole = message.member.guild.roles.cache.find(r => r.name === client.config.staffRoleName);
			if(!staffRole) return message.channel.send(`❌ The selected staff role could not be found.`)
			
			if(message.member.roles.cache.find(r => r.name === client.config.staffRoleName)){
				if(!args[0]) return message.reply(`Please enter a discord user id`)
				if(!isNumber(args[0])) return message.reply(`Please enter a discord user id`)
				if(!member) return message.reply(`Please make sure that the user is in this server`)

				message.react('✅').catch(error => { message.channel.send(`❌ There was an error adding the reaction`) })

				const embed = new Discord.MessageEmbed()
				.setTitle(client.config.botName)
				.setColor(client.config.declinedVerificationEmbedColor)
				.setDescription(`Your verification has been declined.`)
				.addField('Reason', reason)
				member.send(embed).catch(error => { message.channel.send(`❌ There was an error dming <@${args[0]}>`) })

				member.kick('Verification Declined')
				.then(() => {
					message.channel.send(`Declined <@${args[0]}>\nReason: \`${reason}\``)
			  	}).catch(err => {
					message.reply('❌ There was an error declining the member');
					// Log the error
					console.error(err);
			  	})
			}else{
				message.reply(`❌ You have have the \`${client.config.staffRoleName}\` role to use this command`)
			}
		}
	}
};