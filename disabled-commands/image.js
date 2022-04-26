const fs = require('node:fs');
images = fs.readdirSync('./bin/images');
image = images[0];

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('image')
        .setDescription('Replies with a goat.'),
    async execute(interaction) {
        await interaction.reply("under development");
    },
};