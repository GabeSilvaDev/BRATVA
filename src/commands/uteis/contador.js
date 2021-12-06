const { Interaction, MessageActionRow, MessageButton } = require('discord.js')
const Command = require('../../structures/Command')

const actionRow = new MessageActionRow()
    .addComponents(
        [
            new MessageButton()
            .setStyle('DANGER')
            .setLabel('-1')
            .setCustomId('REMOVER'),
            new MessageButton()
            .setStyle('SUCCESS')
            .setLabel('+1')
            .setCustomId('ADICIONAR'),
            new MessageButton()
            .setStyle('PRIMARY')
            .setLabel('ZERAR')
            .setCustomId('ZERAR')
        ]
    )

module.exports = class extends Command {
    constructor(client) {
        super(client, {

            name: 'contador',
            description: 'Inicia um contador no canal'
        })
    }

    run = async (Interaction) => {
        let contagem = 0

        const reply = await Interaction.reply({
            content: `Contagem: \`${contagem}\``, 
            components: [actionRow],
            fetchReply: true
        })

        const filter = function (b) {
            if(b.user.id === Interaction.user.id) return true
            else return false
        }
        const collector = reply.createMessageComponentCollector({ filter, time: (10 * 60000) })

        collector.on('collect', (i) => {
            switch (i.customId) {
                case 'REMOVER':
                    contagem--
                    break;
                case 'ADICIONAR':
                    contagem++
                    break;
                case 'ZERAR':
                    contagem = 0
                    break;
            }

            i.update({
                content: `Contagem: \`${contagem}\``, 
                components: [actionRow]
            })
        })

        collector.on('end', (collected, reason) => {
            if(reason === 'time') Interaction.editReply({
                content: `Contagem Finalizada em \`${contagem}\``,
                components: []
            })
        })

    }
}