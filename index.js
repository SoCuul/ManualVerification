const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS
    ],
    allowedMentions: { repliedUser: false }
});

require('dotenv').config();

//Attach to client
client.config = require('./config.json');
client.wait = ms => new Promise(resolve => setTimeout(resolve, ms));
client.random = arr => arr[Math.floor(Math.random() * arr.length)]
client.sendError = function (input) {
    if(!input) return
    
    return new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle('Error')
    .setDescription(input)
    .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
}
client.validColour = async (colour) => {
    try {
        await Discord.Util.resolveColor(colour)

        return true
    }
    catch (error) {
        return false
    }
}

//Load modules
if(fs.existsSync('./modules.js')){
    require('./modules.js')(client)
}

//Check config configuration
(async () => {
	if(client.config){
        //Presence
        if (typeof client.config.presence !== 'object' || Array.isArray(client.config.presence)) {
            console.log('[Config Error] "presence" must be an object')
            process.exit(0)
        }
        //Presence: Activities
        if (typeof client.config.presence.activities !== 'object' || !Array.isArray(client.config.presence.activities)) {
            console.log('[Config Error] "presence.activities" must be an array')
            process.exit(0)
        }
        //Presence: Switch Activity Interval
        if (typeof client.config.presence.switchActivityInterval !== 'number') {
            console.log('[Config Error] "presence.switchActivityInterval" must be an number')
            process.exit(0)
        }
        //Presence: Status
        if (typeof client.config.presence.status !== 'string') {
            console.log('[Config Error] "presence.status" must be an string')
            process.exit(0)
        }

        //Info
        if (typeof client.config.info !== 'object' || Array.isArray(client.config.info)) {
            console.log('[Config Error] "info" must be an object')
            process.exit(0)
        }
        //Info: Guild ID
        if (typeof client.config.info.guildID !== 'string') {
            console.log('[Config Error] "info.guildID" must be a string')
            process.exit(0)
        }
        //Info: Channel ID
        if (typeof client.config.info.channelID !== 'string') {
            console.log('[Config Error] "info.channelID" must be a string')
            process.exit(0)
        }
        //Info: Include Ban Button
        if (typeof client.config.info.includeBanButton !== 'boolean') {
            console.log('[Config Error] "info.includeBanButton" must be a boolean')
            process.exit(0)
        }
    
        //Verified
        if (typeof client.config.verified !== 'object' || Array.isArray(client.config.verified)) {
            console.log('[Config Error] "verified" must be an object')
            process.exit(0)
        }
        //Verified: Notify User
        if (typeof client.config.verified.notifyUser !== 'boolean') {
            console.log('[Config Error] "verified.notifyUser" must be a boolean')
            process.exit(0)
        }
        //Verified: Set Nickname Toggle
        if (typeof client.config.verified.setNickname !== 'boolean') {
            console.log('[Config Error] "verified.setNickname" must be a boolean')
            process.exit(0)
        }
        //Verified: Set Role Toggle
        if (typeof client.config.verified.setRole !== 'boolean') {
            console.log('[Config Error] "verified.setRole" must be a boolean')
            process.exit(0)
        }
        //Verified: Role ID
        if (typeof client.config.verified.setRole === true && typeof client.config.verified.roleID !== 'string') {
            console.log('[Config Error] "verified.roleID" must be a string')
            process.exit(0)
        }
        //Presence: Nickname prefix
        if (typeof client.config.verified.setNickname === true && client.config.verified.nicknamePrefix !== 'string') {
            console.log('[Config Error] "verified.nicknamePrefix" must be a string')
            process.exit(0)
        }
    
        //Colours
        if (typeof client.config.colours !== 'object' || Array.isArray(client.config.colours)) {
            console.log('[Config Error] "colours" must be an object')
            process.exit(0)
        }
        //Colours: Verification Embed
        if (!await client.validColour(client.config.colours.verificationEmbed)) {
            console.log('[Config Error] "colours.verificationEmbed" must be a valid colour')
            process.exit(0)
        }
        //Colours: Invalid Verification Embed
        if (!await client.validColour(client.config.colours.invalidVerificationEmbed)) {
            console.log('[Config Error] "colours.invalidVerificationEmbed" must be a valid colour')
            process.exit(0)
        }
        //Colours: Success Embed
        if (!await client.validColour(client.config.colours.successEmbed)) {
            console.log('[Config Error] "colours.successEmbed" must be a valid colour')
            process.exit(0)
        }
        //Colours: Failure Embed
        if (!await client.validColour(client.config.colours.failureEmbed)) {
            console.log('[Config Error] "colours.failureEmbed" must be a valid colour')
            process.exit(0)
        }
        //Colours: Ban Embed
        if (!await client.validColour(client.config.colours.banEmbed)) {
            console.log('[Config Error] "colours.banEmbed" must be a valid colour')
            process.exit(0)
        }
    }
})()

//Load events
fs.readdir('./events/', (_err, files) => {
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        
        const event = require(`./events/${file}`);
        let eventName = file.split('.')[0];

        client.on(eventName, event.bind(null, client));
        console.log(`Event loaded: ${eventName}`);
    });
});

//Client Login
try{
    client.login(process.env.TOKEN)
}
catch(error){
    console.log('[Error] Could not login. Please make sure the token is valid.')
    process.exit(1)
}