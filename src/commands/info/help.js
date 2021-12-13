const Command = require('../../structures/Command')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')


module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            description: 'Mostra todos meus comandos!'
        })
    }

    run = async (interaction) => {
        
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("painel_inicial")
                .setStyle("SECONDARY")
                .setLabel("Painel Incial")
                .setEmoji('🏠') 
                .setDisabled(false),
            new MessageButton()
                .setCustomId("moderação")
                .setStyle("SECONDARY")
                .setLabel("Moderação")
                .setEmoji('📒')
                .setDisabled(false),
            new MessageButton()
                .setCustomId("música")
                .setStyle("SECONDARY")
                .setLabel("Música")
                .setEmoji('🎧')
                .setDisabled(false),
            new MessageButton()
                .setCustomId("fechar")
                .setStyle("DANGER")
                .setLabel("Fechar Painel")
                .setEmoji('❌')
                .setDisabled(false)
            )
            const painel = new MessageEmbed()
            .setTitle(`📜 | BRATVA - CATEGORIAS`)
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`**__Olá ${interaction.user}, veja meus comandos com as reações abaixo:__**\n\n\`🏠\` ***Painel Inicial***\n\`📒\` ***Moderação***\n\`🎧\` ***Música***\n\`❌\` ***Fechar Painel***`)
            .setFooter(`${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        
            //painel.delete()
            const m = await interaction.channel.send({embeds: [painel], components: [row], fetchReply: true, ephemeral: true })

            const iFilter = i => i.user.id === interaction.user.id;
                const collector = m.createMessageComponentCollector({ filter: iFilter, time: 10 * 60000 });
                    collector.on('collect', async(i) => {
                        i.deferUpdate()
                        switch (i.customId) {
                        case 'painel_inicial':
                        m.edit({
                        embeds: [
                            new MessageEmbed()
                            .setTitle(`📜 | BRATVA - CATEGORIAS`)
                            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                            .setDescription(`**__Olá ${interaction.user}, veja meus comandos com as reações abaixo:__**\n\n\`🏠\` ***Painel Inicial***\n\`📒\` ***Moderação***\n\`🎧\` ***Música***\n\`❌\` ***Fechar Painel***`)
                            .setFooter(`${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                
                        ]
                    })
                    break;
                case 'moderação':
                    let mod = "Moderação";
                    m.edit({
                        embeds: [
                            new MessageEmbed()
                            .setTitle(`📒 | Moderação - (3 Comandos)`)
                            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                            .setDescription(`**> ・Todos os comandos de __${mod}:__\n\n・/clear - \`Limpa o chat\`\n・/ban - \`Bane um Usuário\`\n・/kick - \`Expulsa um Usuário\`**`)
                            .setFooter(`${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                            
                        ]
                    })
                  break;
                case 'música':
                    let dvr = "Música";
                    m.edit({
                        embeds: [
                            new MessageEmbed()
                            .setTitle(`🎧 | Músicas - (8 Comandos)`)
                            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                            .setDescription(`**> ・Todos os comandos de __${dvr}:__\n\n・/pause - \`Pausa uma Música\`\n・/play - \`Toca uma Música\`\n・/queue - \`Mostra a PlayList de música à tocar\`\n・/repeat - \`Repete a música que está tocando\`\n・/resume - \`DesPausa A música atual\`\n・/skip - \`Pula a música tocando\`\n・/stop - \`Para a PlayList de música tocando\`\n・/volume - \`Aumenta ou Diminui o volume das músicas\`**`)
                            .setFooter(`${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                            
                        ]
                    })
                    break;
                case "fechar":
             
                    m.delete()
            
                    let closed = new MessageEmbed()
            
                    .setDescription(`**${interaction.user} O painel de ajuda foi encerrado.**`)
                        
                    m.channel.send({embeds: [closed], ephemeral: true });
                    
            }
        })
    }
}