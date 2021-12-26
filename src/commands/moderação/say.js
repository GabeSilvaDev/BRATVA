const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            description: 'Mande uma mensagem no canal!',
            options: [{
                name: 'mensagem',
                type: 'STRING',
                description: 'Mensagem que deseja passar!',
                required: true,
            }
        ]
        })
    }

    run = (interaction) => {
        if (!interaction.member.permissions.has("MANAGE_MESSAGES")) return message.reply({ content: "você não tem permissão para usar esse comando!", epehemeral: true });

        const sayMessage = interaction.options.getString('mensagem');

        interaction.delete().catch(O_o => {});
        interaction.channel.send(sayMessage);
    }
}