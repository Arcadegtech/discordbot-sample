const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const client = require('../index')
const config = require('../config.json')
const prefix = config.prefix;

client.commands = new Collection();
const commandFiles = fs.readdirSync('./prefix-commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`../prefix-commands/${file}`);
	client.commands.set(command.name, command);
}

module.exports = {
	name: 'messageCreate',
	execute(message) {
		// prefix check
		if (!message.content.startsWith(prefix) || message.author.bot) return;
		
		const args = message.content.slice(prefix.length).trim().split(/ +/);
    	const command = args.shift().toLowerCase();
	    if (!client.commands.has(command)) return;
		//logs
		
		try {
			client.commands.get(command).execute(message, args);
			return;
		} catch (error) {
			console.error(error);
			message.reply('there was an error trying to execute that command!');
			return;
		}
		return;
	},
};