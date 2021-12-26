const Command = require('../../structures/Command')
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'servidores',
            description: 'Mostra a lista de servidores!',
            type: "CHAT_INPUT",
        })
    }

    run = (interaction) => {

        let owner = ['672644638770987019']

        if (!owner.includes(interaction.user.id)) return interaction.reply({ content: ":x: | Você não é meu dono!", ephemeral: true })
        try {
            let servers = interaction.guilds
            let a = (servers.cache.map(se => `Nome: ${se.name} - ID: \`${se.id}\`\n`).slice(0,10))
            let b = (servers.cache.map(se => `Nome: ${se.name} - ID: \`${se.id}\`\n`).slice(10,20))

        const embed = new MessageEmbed()

        .setDescription(guild.map((guild, index) => `#**${index + 1}**  \`${guild.name}\` | ${guild.memberCount} Members | \`${guild.id}\``).join('\n'))
        .setColor("RANDOM")
        .setFooter(`${interaction.user.username}`, interaction.member.displayAvatarURL({ format:"png"}))

        interaction.followUp({ embeds: [embed]});

        } catch(e) {
            console.log(e)
        }
    }
}