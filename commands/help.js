module.exports = {
	run(client, message) {
		const Discord = require("discord.js");
		if(message.member.roles.cache.some(role => role.name === client.config.verifiedRoleName)) {
			const tick = '`'
			const embed = new Discord.MessageEmbed()
			.setTitle(client.config.botName)
			.setColor('BLUE')
			.setDescription(`✅ Accept ${tick}!accept userid${tick}\n❌ Decline ${tick}!decline userid reason${tick}`)
			.setTimestamp()
			message.channel.send(embed)
	}else{
			message.reply(`❌ You have have the ${tick}${client.config.staffRoleName}${tick} to use this command`)
		}
	}
};