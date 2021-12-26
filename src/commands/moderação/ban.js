const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            description: 'Bane um Usuário!',
            type: "CHAT_INPUT",
            options: [
                {
                    name: "usuario",
                    description: "Usuário que deseja banir!",
                    type: 'USER',
                    required: true
                },
                {
                    name: 'motivo',
                    description: 'Motivo pelo qual quer banir!',
                    type: 'STRING',
                    required: false
                },
            ],
        })
    }

    run = (interaction) => {

        //interaction.reply({ content: "Em criação", ephemeral: true })

        let user = interaction.options.getUser("usuario");
        const memberTarget = interaction.guild.members.cache.get(user.id);
        let rr = interaction.options.getString("motivo");
        let rra = interaction.options.getString("motivo");

        if(rra == null) rra = `Sem motivo`;
        if(rr == null) rr = `Banido pelo dono do server!`;

        if(user.id == interaction.user.id) return interaction.followUp({ content: `Você não pode se banir!`, epehemral: true });
        if(user.id == interaction.guild.me.id) return interaction.followUp({content: `Você não pode me banir!`, ephemeral: true });
        if(user.id == interaction.guild.ownerId) return  interaction.followUp({content: `Você não pode banir o dono do server!`, ephemeral: true });

        if (!interaction.member.permissions.has("BAN_MEMBERS")) 
        return interaction.reply({ content: "Você não tem permissão para usar esse comando!", epehemeral: true });

        if(!interaction.guild.me.permissions.has("BAN_MEMBERS"))
        return interaction.reply({ content: "Eu não tenho permissão para banir usuários!", epehemeral: true });

        if(interaction.guild.ownerId) {
            interaction.followUp({content: `${user} foi banido! Motivo: ` +  rr })
            
            memberTarget.ban({reason: rr || `Banido pelo dono do server!`})
           
        };
        interaction.followUp({content: `${user} foi banido! Motivo: ` +  rra })

        memberTarget.ban({reason: rra})




    }
}