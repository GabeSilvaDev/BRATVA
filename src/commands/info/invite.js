const Command = require('../../structures/Command')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            description: 'Mando meu Convite para você!'
        })
    }

    run = (interaction) => {
        const embed = new MessageEmbed()
            .setTitle('Olá meu nome é BRATVA, fui criado pelo ! Gabriel「ᴏʟᴅ」#4482\n Me Adicione em seu servidor!')
            .setAuthor('Bratva | Convite')
            .setColor('RANDOM')
            .setFooter(`${interaction.user.username}`, interaction.member.displayAvatarURL({ format:"png"}))
            .setTimestamp()


        const buttons = new MessageActionRow()
            .addComponents(
                new MessageButton()

                    .setStyle('LINK')
                    .setEmoji('📎')
                    .setLabel('Me convide')
                    .setURL('https://discord.com/api/oauth2/authorize?client_id=877636824690987008&permissions=8&scope=bot')
            )
        interaction.reply({ embeds: [embed], components: [buttons], fetchReply: true })

    }
}