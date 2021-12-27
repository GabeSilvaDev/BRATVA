const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            description: 'Expulsa em usuário!',
            type: "CHAT_INPUT",
            options: [
                {
                    name: "usuario",
                    description: "Usuário que deseja expulsar!",
                    type: 'USER',
                    required: true
                },
                {
                    name: 'motivo',
                    description: 'Motivo pelo qual quer expulsar!',
                    type: 'STRING',
                    required: false
                },
            ],
        })
    }

    run = (interaction) => {
        try {

        let user = interaction.options.getUser("usuario");
        const memberTarget = interaction.guild.members.cache.get(user.id);
        let rra = interaction.options.getString("motivo");

        //if(rra == null) rra = `Sem motivo`;

        if(user.id == interaction.user.id) return interaction.followUp({ content: `Você não pode se expulsar!`, epehemral: true });
        if(user.id == interaction.guild.me.id) return interaction.followUp({content: `Você não pode me expulsar!`, ephemeral: true });
        if(user.id == interaction.guild.ownerId) return  interaction.followUp({content: `Você não pode expulsar o dono do server!`, ephemeral: true });

        if (!interaction.member.permissions.has("KICK_MEMBERS")) 
        return interaction.reply({ content: "Você não tem permissão para usar esse comando!", epehemeral: true });

        if(!interaction.guild.me.permissions.has("BAN_MEMBERS"))
        return interaction.reply({ content: "Eu não tenho permissão para banir usuários!", epehemeral: true })


        interaction.followUp({content: `${user} foi expulso! Motivo: ` +  rra })

        memberTarget.kick({reason: rra})

        } catch(e) {
            console.log(e)
        }


    }
}