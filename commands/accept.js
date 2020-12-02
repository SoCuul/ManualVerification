module.exports = {
	run(client, message) {
		if(message.guild.id === client.config.guildID){
		const Discord = require("discord.js");
		const axios = require("axios");
		const args = message.content.slice(1).trim().split(/ +/g);
		const command = args.shift().toLowerCase();
		const member = message.guild.members.cache.get(args[0])
		const tick = '`'
		function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 
		if(message.member.roles.cache.has(client.config.staffRoleName)){
			if(!args[0]) return message.reply(`Please enter a discord user id`)
			if(!isNumber(args[0])) return message.reply(`Please enter a discord user id`)

			message.react('✅')
			
			axios({
				method: 'GET',
				url: `https://verify.eryn.io/api/user/${args[0]}`,
			}).then(function(response) {
		  if (response.status = 'ok') {
			const embed = new Discord.MessageEmbed()
			.setTitle(client.config.botName)
			.setDescription(`You have been verified!\nYou can now fully access the server`)
			.setColor(client.config.acceptedVerificationEmbedColor)
			.setFooter(message.guild.name, '');
			member.send(embed).catch(error => { message.channel.send(`❌ There was an error dming <@${args[0]}`) })
			let MemberRole = message.member.guild.roles.cache.find(r => r.name === client.config.verifiedRoleName);
			member.roles.add(MemberRole).catch(console.error);

			member.setNickname(`${client.config.verifiedPrefix} | ` + response.data.robloxUsername, `Verification Accepted`).catch(console.error);

			message.channel.send(`Accepted <@${args[0]}>`)
		}
	}).catch(function(error) {
		message.channel.send(`❌ I couldnt find a Roblox account linked to <@${args[0]}>, or there was an error.`)
	})}else{
			message.reply(`❌ You have have the ${tick}${client.config.staffRoleName}${tick} to use this command`)
		}
	}
}};