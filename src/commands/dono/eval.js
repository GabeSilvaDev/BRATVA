const Command = require('../../structures/Command')
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            description: 'Execute um comando pelo bot',
            type: "CHAT_INPUT",
            options: [
                {
                name: "codigo",
                description: "Escreva seu código aqui",
                type:"STRING", 
                require: true,
              },
                    ],
        })
    }

    run = (interaction, args) => {
        
        const { inspect } = require('util');

        let owner = ['672644638770987019']

        if (!owner.includes(message.author.id)) return interaction.reply({ content: ":x: | Você não é meu dono!", ephemeral: true })

        let command = interaction.options.getString('codigo')
        //const search = interaction.options.getString('música')
        const embed = new MessageEmbed()

        try {
            let evaled = eval(command);
            embed.addField(`Tipo`, `\`\`\`js\n${typeof(evaled)}\`\`\``, true);
            embed.addField(`Saída`, `\`\`\`js\n${inspect(evaled, {depth: 0})}\`\`\``);

            interaction.reply({ embeds: [embed] })
            .catch(err => console.log("erro: " + err.message));

        } catch (error) {
            embed.addField(`Erro`, `\`\`\`js\n${error}\`\`\``);
            interaction.reply({ embeds: [embed] });
    }
    }
}