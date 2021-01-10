module.exports = (client, member) => {
	const axios = require('axios')
	const Discord = require('discord.js')
		if (member.guild.id === client.config.guildID){
			axios({
				method: 'GET',
				url: `https://verify.eryn.io/api/user/${member.id}`,
			}).then(function(response) {
  				if (response.status = 'ok') {
					const embed = new Discord.MessageEmbed()
					.setColor(client.config.verificationEmbedColor)
					.setTitle(client.config.botName)
					.setDescription(`The staff team has been notified and are verifying your account.\nRoblox Account: [**${response.data.robloxUsername}**](https://www.roblox.com/users/${response.data.robloxId}/profile)\nIf this is not the account you want to verify as, [reverify](https://verify.eryn.io/) and then rejoin the discord server.`)
					.setThumbnail(`http://www.roblox.com/Thumbs/Avatar.ashx?x=600&y=600&Format=Png&username=${response.data.robloxUsername}`)
					member.send(embed).catch(error => { message.channel.send(`❌ There was an error dming the user about the verification status.`) })

					const VerHook = new Discord.WebhookClient(process.env.webhookID, process.env.webhookToken);
					const verembed = new Discord.MessageEmbed()
					.setColor(client.config.verificationEmbedColor)
					.setTitle(client.config.botName)
					.setThumbnail(`http://www.roblox.com/Thumbs/Avatar.ashx?x=600&y=600&Format=Png&username=${response.data.robloxUsername}`)
					.addFields(
		  				{ name: 'Discord Account', value: `${member.user.tag} (${member})` },
						{ name: 'Discord ID', value: member.id },
						{ name: 'Roblox Account', value: `[**${response.data.robloxUsername}**](https://www.roblox.com/users/${response.data.robloxId}/profile)` },)
					VerHook.send(verembed).catch(error => { message.channel.send(`❌ There was an error sending a user's info to the webhook.`) })
  				}
			}).catch(function(error) {
				const embed = new Discord.MessageEmbed()
				.setColor(client.config.verificationEmbedColor)
				.setTitle(client.config.botName)
				.setDescription(`We couldn't detect a roblox account linked to this discord account.\nIf you haven't yet, [verify here](https://verify.eryn.io/) and then rejoin the discord server. If you have verified before, please try rejoining the server.`)
				member.send(embed).catch(error => { message.channel.send(`❌ There was an error dming the user about the verification status.`) })
			})
		}
};