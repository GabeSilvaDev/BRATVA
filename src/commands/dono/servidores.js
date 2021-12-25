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

        if (!owner.includes(message.author.id)) return interaction.reply({ content: ":x: | Você não é meu dono!", ephemeral: true })

        const guild = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).first(30);

        const embed = new MessageEmbed()

        .setDescription(guild.map((guild, index) => `#**${index + 1}**  \`${guild.name}\` | ${guild.memberCount} Members | \`${guild.id}\``).join('\n'))
        .setColor("RANDOM")
        .setFooter(`${interaction.user.username}`, interaction.member.displayAvatarURL({ format:"png"}))

        interaction.followUp({ embeds: [embed]});
    }
}