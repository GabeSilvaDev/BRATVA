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
        
       /* try {
            if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.followUp({content: `Você não tem permissão para isso!`});
            if(!interaction.guild.me.permissions.has("MANAGE_MESSAGES")) return interaction.followUp({content: `Eu não tenho permissão para isso!`});
            let delamount = interaction.options.getString('quantidade');
            if (isNaN(delamount) || parseInt(delamount <= 0)) return interaction.followUp({content: ' > ``Coloque um número específico;``\n > ``Exp: /clear 3.``'} )

            if (parseInt(delamount) > 100) return interaction.followUp({content:'Só podes eleminar 99 mensagens de uma vez!'})

            interaction.followUp('``Clear feito com sucesso!``✅').then(m => {
                setTimeout(() => {
                  interaction.channel.bulkDelete(parseInt(delamount) * 1, true)
                }, 1000) // 2 segundos
            })

          
        } catch (e) {
            console.log(e)
        }*/
    }
}