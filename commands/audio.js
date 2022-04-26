const { Client } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');
const fs = require('node:fs');
images = fs.readdirSync('./bin/audio');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('goats')
		.setDescription('Plays goat noises!'),
	async execute(interaction) {

        console.log(interaction.member.voice.channel);
        if(interaction.member.voice.channel) {
            const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            const resource = createAudioResource('./bin/audio/attackedByGoats.mp3');
    
            const player = createAudioPlayer();
            player.play(resource);
            
            player.on('error', error => {
                console.error(error);
            });
            
            player.on(AudioPlayerStatus.Idle, () => {
                connection.disconnect();
            })
    
            connection.subscribe(player);
    
            interaction.reply("BAAA!");
        }
        else {
            interaction.reply("baaa...");
        }
	},
};