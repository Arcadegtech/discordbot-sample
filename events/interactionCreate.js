const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.DIRECT_MESSAGES,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,Intents.FLAGS.DIRECT_MESSAGE_TYPING,Intents.FLAGS.GUILD_BANS,Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,Intents.FLAGS.GUILD_INTEGRATIONS,Intents.FLAGS.GUILD_INVITES,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_MESSAGE_REACTIONS,Intents.FLAGS.GUILD_MESSAGE_TYPING,Intents.FLAGS.GUILD_PRESENCES,Intents.FLAGS.GUILD_VOICE_STATES,Intents.FLAGS.GUILD_SCHEDULED_EVENTS],partials:['CHANNEL'] });
const config = require('../config.json')
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`../commands/${file}`);
	
	client.commands.set(command.data.name, command);
}

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		
		if (!interaction.isCommand()) return;
		if (interaction.user.bot) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;
		if (interaction.guild) { if (!interaction.channel.permissionsFor(interaction.client.user).has('SEND_MESSAGES')) return; }
		
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			return;
		}
		return;
	},
};