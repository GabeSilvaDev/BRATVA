const { MessageEmbed } = require('discord.js')
const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'repeat',
            description: 'Repete a música ou sua PlayList!'
        })
    }

    run = async (interaction, args) => {
        const player = this.client.manager.get(interaction.guild.id)
        if (!player) return interaction.reply({ content: ':x: | Não estou tocando neste servidor.', ephemeral: true })

        const memberVoiceChannel = interaction.member.voice.channel
        if (!memberVoiceChannel) return interaction.reply({ content: ':x: | Você precisa estar em um canal de voz para usar este comando.', ephemeral: true })
        if (memberVoiceChannel.id !== player.voiceChannel) return interaction.reply({ content: ':x: | Você precisa estar no mesmo canal de voz que eu.', ephemeral: true })

        if (interaction.options.string && /queue/i.test(args[0])) {
            player.setQueueRepeat(!player.queueRepeat);
            const queueRepeat = player.queueRepeat ? "Ligado" : "Desligado";
            const embed = new MessageEmbed()
            .setTitle("Repetição de PlayList")
            .setColor('RANDOM')
            .setDescription(`A repetição da Queue foi ${queueRepeat}!`)
            .setTimestamp()
            .setFooter(`${interaction.user.username}`, interaction.member.displayAvatarURL({ format:"png"}))
            
            return interaction.reply({ embeds: [embed] });
          }
      
          player.setTrackRepeat(!player.trackRepeat);
          const trackRepeat = player.trackRepeat ? "Ligado" : "Desligado";
          const embed = new MessageEmbed()
            .setTitle("Repetição da Música")
            .setColor('RANDOM')
            .setDescription(`A repetição da música foi ${trackRepeat}!`)
            .setTimestamp()
            .setFooter(`${interaction.user.username}`, interaction.member.displayAvatarURL({ format:"png"}))
            
            return interaction.reply({ embeds: [embed] });
    }
}