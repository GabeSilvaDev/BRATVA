const Command = require('../../structures/Command')
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'join',
            description: 'Coloca o bot na Call'
        })
    }

    run = async (interaction) => {
        const player = this.client.manager.get(interaction.guild.id)
        if (!player) return interaction.reply({ content: ':x: | Não estou tocando neste servidor.', ephemeral: true })

        const memberVoiceChannel = interaction.member.voice.channel
        if (!memberVoiceChannel) return interaction.reply({ content: ':x: | Você precisa estar em um canal de voz para usar este comando.', ephemeral: true })
        if (memberVoiceChannel.id !== player.voiceChannel) return interaction.reply({ content: ':x: | Você precisa estar no mesmo canal de voz que eu.', ephemeral: true })

        player = client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id,
            selfDeafen: config.settings.selfDeaf,
          });

          if (player.state !== "CONNECTED") { 
            player.connect();
            player.stop();
          }
          else {
            var vc = player.voiceChannel;
            var voiceChannel = message.guild.channels.cache.get(player.voiceChannel);
            
            embed = new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | I am already connected somewhere`)
              .setDescription(`I am connected in: \`${vc ? voiceChannel ? voiceChannel.name : vc : "could not get voicechanneldata"}\``)

            return message.channel.send({ embeds: [embed] })
          }
        }
    }