const config = require('../config.json')
const client = require('../index')
module.exports = {
	name: 'test',
	description: 'Ping!',
	execute(message, args) {
		message.channel.send(`*Hello, <@${message.author.id}>* \n**Bot Online Since :** \`${message.client.readyAt}\` \n**Bot Ping to Discord :** \`${Math.round(message.client.ws.ping)}ms\`  \nGuilds : ${message.client.guilds.cache.size} `)
		return;
	},
};