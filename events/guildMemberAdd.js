const axios = require('axios')
const Discord = require('discord.js')
module.exports = (client, member) => {
if (member.guild.id === client.config.guildID){
	axios({
		method: 'GET',
		url: `https://verify.eryn.io/api/user/${member.id}`,
	}).then(function(response) {
  if (response.status = 'ok') {
	const embed = new Discord.MessageEmbed()
	.setTitle(client.config.botName)
	.setDescription(`The staff team has been notified and are verifying your account.\nRoblox Account: [**${response.data.robloxUsername}**](https://www.roblox.com/users/${response.data.robloxId}/profile)\nIf this is not the account you want to verify as, [reverify](https://verify.eryn.io/) and then rejoin the Avient discord server.`)
	.setThumbnail(`http://www.roblox.com/Thumbs/Avatar.ashx?x=600&y=600&Format=Png&username=${response.data.robloxUsername}`)
	.setColor(client.config.verificationEmbedColor)
	member.send(embed)

	const VerHook = new Discord.WebhookClient(process.env.webhookID, process.env.webhookToken);
	const verembed = new Discord.MessageEmbed()
	.setTitle(client.config.botName)
	.setColor(client.config.verificationEmbedColor)
	.setThumbnail(`http://www.roblox.com/Thumbs/Avatar.ashx?x=600&y=600&Format=Png&username=${response.data.robloxUsername}`)
	.addFields(
		  { name: 'Discord Account', value: `${member.user.tag} (${member})` },
		  { name: 'Roblox Account', value: `[**${response.data.robloxUsername}**](https://www.roblox.com/users/${response.data.robloxId}/profile)` },)
	VerHook.send(verembed)
  }
}).catch(function(error) {
	const embed = new Discord.MessageEmbed()
	.setTitle(client.config.botName)
	.setDescription(`We couldn't detect a roblox account linked to this discord account.\nIf you haven't yet, [verify here](https://verify.eryn.io/) and then rejoin the Avient discord server. If you have verified before, please try rejoining the server.`)
	.setColor(client.config.verificationEmbedColor)
	member.send(embed)
})
}};