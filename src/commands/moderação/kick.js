const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            description: 'Expulsa um usuário!'
        })
    }

    run = (interaction) => {
        interaction.reply({
            content: `O ping do bot é \`${this.client.ws.ping}\`ms.`,
            ephemeral: true
        })
    }
}