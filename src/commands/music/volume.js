const Command = require('../../structures/Command')
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'volume',
            description: 'Aumenta ou Diminui o volume da musica!',
            options: [
                {
                    name: 'decisão',
                    description: 'Volume que deseja!',
                    type: 'INTEGER',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {

        const player = this.client.manager.get(interaction.guild.id)
        if (!player) return interaction.reply({ content: ':x: | Não estou tocando neste servidor.', ephemeral: true })

        const memberVoiceChannel = interaction.member.voice.channel
        if (!memberVoiceChannel) return interaction.reply({ content: ':x: | Você precisa estar em um canal de voz para usar este comando.', ephemeral: true })
        if (memberVoiceChannel.id !== player.voiceChannel) return interaction.reply({ content: ':x: | Você precisa estar no mesmo canal de voz que eu.', ephemeral: true })

        const volume = interaction.options.getInteger('decisão');

        if (!volume || volume < 1 || volume > 100) return interaction.reply({ content: ":x: | Você precisa escolher um volume de 1 à 100", ephemeral: true });

        player.setVolume(volume);
        const embed = new MessageEmbed()
        .setTitle("Volume")
        .setColor('RANDOM')
        .setDescription(`Volume Colocado para: \`${volume}\`.`)
        .setTimestamp()
        .setFooter(`${interaction.user.username}`, interaction.member.displayAvatarURL({ format:"png"}))
        return interaction.reply({ embeds: [embed] })

    }
}