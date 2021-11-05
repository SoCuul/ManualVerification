const Discord = require('discord.js')
function truncateString(str, num) {
    if (str.length <= num) {
        return str
    }
    return str.slice(0, num) + '...'
}

module.exports = async (client, i) => {
    //Filter out non-commands
    if (!i.isButton()) return

    //Respond to non-guild commands
    if (!i.inGuild()) return await i.reply('You can only use commands in servers.')

    //Check for incorrect guild
    if (i.guild.id !== client.config.info.guildID) return

    //Parse button data
    const [ action, discordID, robloxID, robloxUsername ] = i.customId.split('-')

    //Check for valid button data
    if (!action || !discordID || !robloxID || !robloxUsername) return await i.update({
        content: i.message.content || null
    })

    //Deal with buttons
    switch (action) {
        case 'test': {
            //Defer response
            await i.deferReply({
                ephemeral: true
            })

            //Emit test event
            await client.emit('guildMemberAdd', i.member)

            //Send reply
            return await i.editReply({
                content: '✅ Event emitted',
                ephemeral: true
            })
        }
        case 'accept': {
            try {
                let errors = []

                //Fetch member
                let member
                try {
                    member = await i.guild.members.fetch(discordID)
                }
                catch (error) {
                    const embed = new Discord.MessageEmbed()
                    .setColor(client.config.colours.invalidVerificationEmbed)
                    .setTitle('Invalid Verification')
                    .setDescription('The user has probably left the server. Because of this, the verification could not be accepted.')
                    .setTimestamp()
                    return await i.update({
                        embeds: [ embed ]
                    })
                }

                //Set nickname
                if (client.config.verified.setNickname) {
                    try {
                        await member.setNickname(
                            client.config.verified.nicknamePrefix.length ? `${client.config.verified.nicknamePrefix}${robloxUsername}` : robloxUsername.toString()
                        , 'Manual Verification Accepted')
                    }
                    catch (error) {
                        errors.push('Could not set nickname.')
                    }
                }

                //Give role
                if (client.config.verified.setRole) {
                    if (i.guild.roles.cache.some(r => r.id === client.config.verified.roleID)) {
                        try {
                            await member.roles.add(client.config.verified.roleID, 'Manual Verification Accepted')
                        }
                        catch (error) {
                            errors.push('Could not give role.')
                        }
                    }
                    else {
                        errors.push('Could not find role in server.')
                    }
                }

                //Notify user
                if (client.config.verified.notifyUser) {
                    try {
                        const notifyEmbed = new Discord.MessageEmbed()
                        .setColor(client.config.colours.acceptedEmbed)
                        .setTitle('Verification Accepted')
                        .setDescription('Your verification request has been accepted.')
                        .setFooter(i.guild.name, i.guild.iconURL({ dynamic: true }))
                        .setTimestamp()
                        await member.send({
                            embeds: [ notifyEmbed ]
                        })
                    }
                    catch (error) {
                        errors.push('Could not notify user.')
                    }
                }

                //Modify Embed
                const embed = new Discord.MessageEmbed()
                .setColor(client.config.colours.acceptedEmbed)
                .setTitle('Verification Accepted')
                .setDescription(errors.length ? 'There were some problems verifying the member.' : 'The member has been verified.')
                .setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=600&y=600&Format=Png&userid=${robloxID}`)
                .addField('Discord Account', `**${member.user.tag}** (${member.id})`)
                .addField('Roblox Account', `[**${robloxUsername}**](https://www.roblox.com/users/${robloxID}/profile) (${robloxID})`)
                .addField('Account Age', `<t:${Math.floor(new Date(member.user.createdAt).getTime()  / 1000)}:R>`)
                .setTimestamp()
                if (errors.length) embed.addField('Errors', errors.join('\n'))
                return await i.update({
                    embeds: [ embed ],
                    components: []
                })
            }
            catch (error) {
                //Log error
                console.log(`[Accept Error] ${error}`)

                //Send response
                return await i.reply({
                    content: '❌ There was an error accepting the user.\nPlease try again later.'
                })
            }
        }
        case 'decline': {
            try {
                let errors = []

                //Fetch member
                let member
                try {
                    member = await i.guild.members.fetch(discordID)
                }
                catch (error) {
                    const embed = new Discord.MessageEmbed()
                    .setColor(client.config.colours.invalidVerificationEmbed)
                    .setTitle('Invalid Verification')
                    .setDescription('The user has probably left the server. Because of this, the verification could not be declined.')
                    .setTimestamp()
                    return await i.update({
                        embeds: [ embed ]
                    })
                }

                //Notify user
                if (client.config.verified.notifyUser) {
                    try {
                        const notifyEmbed = new Discord.MessageEmbed()
                        .setColor(client.config.colours.declinedEmbed)
                        .setTitle('Verification Declined')
                        .setDescription('Your verification request has been declined.\nYou have been removed from the server.')
                        .setFooter(i.guild.name, i.guild.iconURL({ dynamic: true }))
                        .setTimestamp()
                        await member.send({
                            embeds: [ notifyEmbed ]
                        })
                    }
                    catch (error) {
                        errors.push('Could not notify user.')
                    }
                }

                //Kick user
                try {
                    await member.kick('Manual Verification Declined')
                }
                catch (error) {
                    errors.push('Could not kick user.')
                }

                //Modify Embed
                const embed = new Discord.MessageEmbed()
                .setColor(client.config.colours.declinedEmbed)
                .setTitle('Verification Declined')
                .setDescription(errors.length ? 'There were some problems declining the member\'s verification.' : 'The member\'s verification has been declined.')
                .setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=600&y=600&Format=Png&userid=${robloxID}`)
                .addField('Discord Account', `**${member.user.tag}** (${member.id})`)
                .addField('Roblox Account', `[**${robloxUsername}**](https://www.roblox.com/users/${robloxID}/profile) (${robloxID})`)
                .addField('Account Age', `<t:${Math.floor(new Date(member.user.createdAt).getTime()  / 1000)}:R>`)
                .setTimestamp()
                if (errors.length) embed.addField('Errors', errors.join('\n'))
                return await i.update({
                    embeds: [ embed ],
                    components: []
                })
            }
            catch (error) {
                //Log error
                console.log(`[Decline Error] ${error}`)

                //Send response
                return await i.reply({
                    content: '❌ There was an error declining the user.\nPlease try again later.'
                })
            }
        }
        case 'ban': {
            try {
                let errors = []

                //Check for permission
                if (!i.member.permissions.has(Discord.Permissions.FLAGS.BAN_MEMBERS)) {
                    const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle('Missing Permissions')
                    .setDescription('You have to have the **Ban Members** permission to do that!')
                    return await i.reply({
                        embeds: [ embed ],
                        ephemeral: true
                    })
                }

                //Fetch member
                let member
                try {
                    member = await i.guild.members.fetch(discordID)
                }
                catch (error) {
                    const embed = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setTitle('Invalid Verification')
                    .setDescription('The user has probably left the server. Because of this, the user could not be banned.')
                    .addField('Discord Account', `**${member.user.tag}** (${member.id})`)
                    .addField('Roblox Account', `[**${robloxUsername}**](https://www.roblox.com/users/${robloxID}/profile) (${robloxID})`)
                    .addField('Account Age', `<t:${Math.floor(new Date(member.user.createdAt).getTime()  / 1000)}:R>`)
                    .setTimestamp()
                    return await i.update({
                        embeds: [ embed ]
                    })
                }

                //Ban user
                if (client.config.verified.notifyUser) {
                    try {
                        await member.ban({ reason: 'Manual Verification Ban' })
                    }
                    catch (error) {
                        errors.push('Could not ban user.')
                    }
                }

                //Modify Embed
                const embed = new Discord.MessageEmbed()
                .setColor(client.config.colours.banEmbed)
                .setTitle('Verification Ban')
                .setDescription(errors.length ? 'There were some problems banning the user.' : 'The user has been successfully banned.')
                .addField('Discord Account', `**${member.user.tag}** (${member.id})`)
                .addField('Roblox Account', `[**${robloxUsername}**](https://www.roblox.com/users/${robloxID}/profile) (${robloxID})`)
                .addField('Account Age', `<t:${Math.floor(new Date(member.user.createdAt).getTime()  / 1000)}:R>`)
                .setTimestamp()
                if (errors.length ) embed.addField('Errors', errors.join('\n'))
                return await i.update({
                    embeds: [ embed ],
                    components: []
                })
            }
            catch (error) {
                //Log error
                console.log(`[Ban Error] ${error}`)

                //Send response
                return await i.reply({
                    content: '❌ There was an error banning the user.\nPlease try again later.'
                })
            }
        }
        default: {
            return await i.update({
                content: i.message.content || null
            })
        }
    }
};