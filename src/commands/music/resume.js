const Command = require('../../structures/Command')
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'resume',
            description: 'Despausa uma música!'
        })
    }

    run = (interaction) => {
        const player = this.client.manager.get(interaction.guild.id)
        if (!player) return interaction.reply({ content: ':x: | Não estou tocando neste servidor.', ephemeral: true })

        const memberVoiceChannel = interaction.member.voice.channel
        if (!memberVoiceChannel) return interaction.reply({ content: ':x: | Você precisa estar em um canal de voz para usar este comando.', ephemeral: true })
        if (memberVoiceChannel.id !== player.voiceChannel) return interaction.reply({ content: ':x: | Você precisa estar no mesmo canal de voz que eu.', ephemeral: true })

        if (!player.paused) return interaction.reply({ content: ':x: | A música não está pausada!', ephemeral: true })

        player.pause(false)
        const embed = new MessageEmbed()
        .setTitle("Resume")
        .setColor('RANDOM')
        .setDescription(`A Música foi DesPausada!`)
        .setTimestamp()
        .setFooter(`${interaction.user.username}`, interaction.member.displayAvatarURL({ format:"png"}))
            
        return interaction.reply({ embeds: [embed] });
    }
}