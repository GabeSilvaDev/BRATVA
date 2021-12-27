const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            description: 'Apaga as mensagens de um canal!',
            options: [{
                name: 'quantidade',
                type: 'STRING',
                description: 'Quantas mensagens deseja apagar?',
                required: true,
            }
        ]
        })
    }

    run = async (interaction) => {
        
        interaction.reply('em desenvolvimento');

        
    }
}