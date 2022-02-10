const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Test Command!'),
	async execute(interaction) {
		await interaction.channel.send(`*Hello, <@${interaction.user.id}>* \n**Bot Online Since :** \`${interaction.client.readyAt}\` \n**Bot Ping to Discord :** \`${Math.round(interaction.client.ws.ping)}ms\`  \nGuilds : ${interaction.client.guilds.cache.size} `);
		return;
	},
};