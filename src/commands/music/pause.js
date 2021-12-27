const Command = require('../../structures/Command')
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'pause',
            description: 'Pausa a música que está tocando!'
        })
    }

    run = (interaction) => {
        const player = this.client.manager.get(interaction.guild.id)
        if (!player) return interaction.reply({ content: ':x: | Não estou tocando neste servidor.', ephemeral: true })

        const memberVoiceChannel = interaction.member.voice.channel
        if (!memberVoiceChannel) return interaction.reply({ content: ':x: | Você precisa estar em um canal de voz para usar este comando.', ephemeral: true })
        if (memberVoiceChannel.id !== player.voiceChannel) return interaction.reply({ content: ':x: | Você precisa estar no mesmo canal de voz que eu.', ephemeral: true })

        if (player.paused) return interaction.reply({ content: ':x: | A música já está pausada!', ephemeral: true })

        player.pause(true)
        const embed = new MessageEmbed()
        .setTitle("Pause")
        .setColor('RANDOM')
        .setDescription(`Musica Pausada com Sucesso!`)
        .setTimestamp()
        .setFooter(`${interaction.user.username}`, interaction.member.displayAvatarURL({ format:"png"}))
        return interaction.reply({ embeds: [embed] })
    }
}