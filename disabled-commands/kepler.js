const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kepler')
		.setDescription('...'),
	async execute(interaction) {
		await interaction.reply('PettingZooWPI.aternos.me');
	},
};