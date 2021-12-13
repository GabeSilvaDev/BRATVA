const Command = require('../../structures/Command')

const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            description: 'Mostra sua PlayList!'
        })
    }

    run = (interaction) => {
        const player = this.client.manager.get(interaction.guild.id)
        if (!player) return interaction.reply({ content: ':x: | Não estou tocando neste servidor.', ephemeral: true })

        const queue = player.queue

        const embed = new MessageEmbed()
            .setTitle(`PlayList`)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(`${interaction.user.username}`, interaction.member.displayAvatarURL({ format:"png"}))

        const tracks = queue.slice(0, 10)

        if (queue.current) embed.addField(`Tocando agora:`, `[${queue.current.title}](${queue.current.uri})`)
        if (!tracks.length) embed.setDescription(`Não há nenhuma música na fila.`)
        else embed.setDescription(
            tracks.map((t, i) => {
                return `${i + 1} - [${t.title}](${t.uri})`
            })
            .join('\n')
        )

        interaction.reply({ embeds: [embed] })
    }
}