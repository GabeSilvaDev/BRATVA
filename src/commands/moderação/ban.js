const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            description: 'Bane um Usuário!'
        })
    }

    run = (interaction) => {
        interaction.reply({
            content: `O ping do bot é \`${this.client.ws.ping}\`ms.`,
            ephemeral: true
        })
    }
}