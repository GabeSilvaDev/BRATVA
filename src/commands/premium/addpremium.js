const Command = require('../../structures/Command')
const premiumSchema = require('../../database/models/premium')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'addpremium',
            description: 'Adiciona o premium para alguem!',
            type: 'CHAT_IMPUT',
            requireDatabase: true,
            premium: true,
            options: [
                {
                    name: 'usuário',
                    type: 'USER',
                    description: 'A quem deseja adicionar o premium!',
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
            if(data) 
                return interaction.reply({ content: 'Este Usúario Já ganhou premium antes!', ephemeral: true })
            
            new premiumSchema({
                User: usuario.id
            }).save();
                return interaction.reply({ content: `Adicionado ${usuario} Na database!`, ephemeral: true })
        })
    }
}