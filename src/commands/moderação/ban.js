const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            description: 'Bane um Usuário!'
        })
    }

    run = (interaction) => {

        
    }
}