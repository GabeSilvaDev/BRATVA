const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            description: 'Bane um Usuário!'
        })
    }

    run = (interaction) => {

        interaction.reply({ content: "Em criação", ephemeral: true })
    }
}