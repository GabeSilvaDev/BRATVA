const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            description: 'Apaga as mensagens de um canal!',
            options: [{
                name: 'canal',
                description: 'Coloque o canal a ser apagado',
                type: 'CHANNEL',
                required: true
            },
            {
                name: 'quantidade',
                description: 'Coloque as mensagens a serem apagadas, de 1 à 100',
                type: 'NUMBER',
                required: true,
            },
        ]
        })
    }

    run = async (interaction) => {
        
        interaction.channel.sendTyping()

        let quan = interaction.options.getNumber('quantidade');
        let channel = interaction.options.getChannel('canal');

        if (channel.type !== 'GUILD_TEXT') return interaction.reply({ content: 'O canal dito não é um canal de texto', ephemeral: true })

        if (!quan || quan < 1 || quan > 100) return interaction.reply({ content: "Você precisa escolher entre apagar 1 à 100!", ephemeral: true });

        channel.bulkDelete(quan)

        interaction.reply({ content: `Foi deletado ${quan} mensagens `})
    }
}