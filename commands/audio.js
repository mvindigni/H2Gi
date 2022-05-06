const { Client } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const ytdl = require('ytdl-core');
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
		.setName('play')
		.setDescription('Plays YouTube audio!')
        .addStringOption(option =>
            option.setName('link')
            .setDescription('The link of the YouTube video')
            .setRequired(true)),
	async execute(interaction) {

        console.log(interaction.member.voice.channel);
        if(interaction.member.voice.channel) {
            const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            /**
             * OLD FUNCTIONALITY
             */
            // const resource = createAudioResource('./bin/audio/attackedByGoats.mp3');
    
            // const player = createAudioPlayer();
            // player.play(resource);
            
            /**
             * NEW FUNCTIONALITY
             */

            ytlink = interaction.options.getString('link');

            const stream = ytdl(ytlink, { filter: 'audioonly' });
            const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
            const player = createAudioPlayer();

            player.play(resource)
            connection.subscribe(player)

            player.on('error', error => {
                console.error(error);
            });
            
            player.on(AudioPlayerStatus.Idle, () => {
                connection.disconnect();
            })
    
            connection.subscribe(player);

            interaction.reply("Playing YouTube video")
        }
        else {
            interaction.reply("Join a voice channel first");
        }
	},
};