module.exports = (client) => {
	console.log(client.config.botName + ' is online!');
  	client.user.setActivity(client.config.statusActivity, { type: client.config.statusType})
};