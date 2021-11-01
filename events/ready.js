module.exports = async (client) => {
    //Online message
    console.log(`${client.user.tag} is online.`)
    console.log(`${client.guilds.cache.size} servers`)
    console.log(`${client.guilds.cache.reduce((a, c) => a + c.memberCount, 0)} users`)

    //Set first status
    try {
        client.user.setPresence({
            activities: [client.random(client.config.presence.activities)],
            status: client.config.presence.status
        })
    }
    catch (error) {
        console.log('[Status Error] Could not set status')
    }

    //Set status each hour
    while (true) {
        await client.wait(client.config.presence.switchActivityInterval)

        //Set status
        try {
            client.user.setPresence({
                activities: [client.random(client.config.presence.activities)],
                status: client.config.presence.status
            })
        }
        catch (error) {
            console.log('[Status Error] Could not set status')
        }
    }
};