const Command = require('../../structures/Command')
const glob = require('glob');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'reload',
            description: 'Reseta os comando sem precisar dar Node!'
        })
    }

    run = (interaction) => {
        
        let owner = ['672644638770987019']
        if (!owner.includes(interaction.user.id)) 
        return interaction.reply({ content: ":x: | Você não é meu dono!", ephemeral: true })

        interaction.reply('Construção!');

    }
}