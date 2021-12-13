const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            description: 'Expulsa um usuário!'
        })
    }

    run = (interaction) => {

        interaction.reply({ content: "Em criação", ephemeral: true })
        
    }
}