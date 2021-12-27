const Command = require('../../structures/Command')
const premiumSchema = require('../../database/models/premium')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'delpremium',
            description: 'Retire o premium de alguem!',
            type: 'CHAT_IMPUT',
            requireDatabase: true,
            premium: true,
            options: [
                {
                    name: 'usuário',
                    type: 'USER',
                    description: 'A quem deseja retirar o premium!',
                    required: true
                },

            ]
        })
    }

    run = async (interaction) => {

        let owner = ['672644638770987019']
        if (!owner.includes(interaction.user.id)) 
        return interaction.reply({ content: ":x: | Você não é meu dono!", ephemeral: true })

        let usuario = interaction.options.getUser("usuário");

        premiumSchema.findOne({
            User: usuario.id
        }, async(err, data) => {
            if(!data) return interaction.reply({ content: "Usuário não está adicionado na database", ephemeral: true })

            data.delete();
            interaction.reply({ content: "Removido da database", ephemeral: true })
        })
    }
}