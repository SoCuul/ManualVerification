module.exports = {
	run(client, message) {
		if(message.guild.id === client.config.guildID){
		const Discord = require("discord.js");
		const axios = require("axios");
		const args = message.content.slice(1).trim().split(/ +/g);
		const command = args.shift().toLowerCase();
		const member = message.guild.members.cache.get(args[0])
		const tick = '`'
		let reason = args.slice(1).join(' ');
		function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 
		if(message.member.roles.cache.has(client.config.staffRoleName)){
			if(!args[0]) return message.reply(`Please enter a discord user id`)
			if(!isNumber(args[0])) return message.reply(`Please enter a discord user id`)
			if(!member) return message.reply(`Please make sure that the user is in this server`)
			if(!reason) return message.reply(`Please enter a reason`)


			const embed = new Discord.MessageEmbed()
			.setTitle(client.config.botName)
			.setDescription(`Your verification has been declined.\nReason: ${reason}`)
			.setColor(declinedVerificationEmbedColor)
			.setFooter(message.guild.name, '');
			member.send(embed).catch(error => { message.channel.send(`❌ There was an error dming <@${args[0]}`) })

			member.kick('Verification Declined')
			.then(() => {
				message.channel.send(`Declined <@${args[0]}>\nReason: ${reason}`);
			  }).catch(err => {
				message.reply('There was an error declining the member');
				// Log the error
				console.error(err);
			  });
	}else{
			message.reply(`❌ You have have the ${tick}${client.config.staffRoleName}${tick} to use this command`)
		}
	}
}};