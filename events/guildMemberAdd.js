const Discord = require('discord.js')
const rblxverify = require('rblxverify')

module.exports = async (client, member) => {
    //Filter incorrect guilds
    if (member.guild.id !== client.config.info.guildID) return

    //Main variables
    let guild
    let channel

    //Get guild
    try {
        guild = await client.guilds.fetch(client.config.info.guildID)
    }
    catch (error) {
        return console.log('[Discord Error] Could not retrieve verification guild')
    }

    //Get channel
    try {
        if (guild.channels.cache.some(c => c.id === client.config.info.channelID)) {
            channel = await guild.channels.fetch(client.config.info.channelID)
        }
        else {
            return console.log('[Discord Error] Could not find verification channel')
        }
    }
    catch (error) {
        return console.log('[Discord Error] Could not retrieve verification channel')
    }

    //Get user verification
    let verifyInfo
    try {
        verifyInfo = await rblxverify.rover(member.id)
    }
    catch (error) {
        console.log(`[Verify Error] There was an error verifying user: ${member.id}`)
    }

    //Check for valid verification
    if (verifyInfo.status !== 'success') {
        const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Verification Error')
        .setDescription(`There was an error retrieving your verification information.\n\nPlease make sure you are verified at https://rover.link/login/\nIf you have already verified, try rejoining this discord server in a few minutes.`)
        .setFooter(member.guild.name, member.guild.iconURL({ dynamic: true }))
        .setTimestamp()
        
        //Notify user
        try {
            return await member.send({
                embeds: [ embed ]
            })
        }
        catch (error) {
            return
        }
    }
    if (!verifyInfo.robloxID || !verifyInfo.robloxUsername) {
        const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Verification Error')
        .setDescription(`There was information missing from the verification request.\n\nTry to re-verify at https://rover.link/login/\nOnce you have re-verified, try rejoining this discord server in a few minutes.`)
        .setFooter(member.guild.name, member.guild.iconURL({ dynamic: true }))
        .setTimestamp()
        
        //Notify user
        try {
            return await member.send({
                embeds: [ embed ]
            })
        }
        catch (error) {
            return
        }
    }

    try {
        //Create verification embed
        const embed = new Discord.MessageEmbed()
        .setColor(client.config.colours.verificationEmbed)
        .setTitle('Verification Request')
        .setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=600&y=600&Format=Png&userid=${verifyInfo.robloxID}`)
        .addField('Discord Account', `**${member.user.tag}** (${member.id})`)
        .addField('Roblox Account', `[**${verifyInfo.robloxUsername}**](https://www.roblox.com/users/${verifyInfo.robloxID}/profile) (${verifyInfo.robloxID})`)
        .addField('Account Age', `<t:${Math.floor(new Date(member.user.createdAt).getTime()  / 1000)}:R>`)
        .setFooter(member.guild.name, member.guild.iconURL({ dynamic: true }))
        .setTimestamp()

        //Create verification buttons
        const buttons = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId(`accept-${member.id}-${verifyInfo.robloxID}-${verifyInfo.robloxUsername}`)
                    .setLabel('Accept')
                    .setStyle('SUCCESS'),
                new Discord.MessageButton()
                    .setCustomId(`decline-${member.id}-${verifyInfo.robloxID}-${verifyInfo.robloxUsername}`)
                    .setLabel('Decline')
                    .setStyle('PRIMARY')
            )
        if (client.config.info.includeBanButton) buttons.addComponents(
            new Discord.MessageButton()
                .setCustomId(`ban-${member.id}-${verifyInfo.robloxID}-${verifyInfo.robloxUsername}`)
                .setLabel('Ban')
                .setStyle('DANGER')
        )

        //Send verification message
        await channel.send({
            embeds: [ embed ],
            components: [ buttons ]
        })

        if (client.config.verified.notifyUser) {
            try {
                //Create notify embed
                const notifyEmbed = new Discord.MessageEmbed()
                .setColor(client.config.colours.verificationEmbed)
                .setTitle('Verification Pending')
                .setDescription('Please wait for a staff member to accept you into the server.')
                .setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=600&y=600&Format=Png&userid=${verifyInfo.robloxID}`)
                .setFooter(member.guild.name, member.guild.iconURL({ dynamic: true }))
                .setTimestamp()
    
                //Send notify message
                await member.send({
                    embeds: [ notifyEmbed ]
                })
            }
            catch (error) {
                return
            }
        }
    }
    catch (error) {
        return console.log(`[Discord Error] Could not send verification message for user: ${member.id}`)
    }
}