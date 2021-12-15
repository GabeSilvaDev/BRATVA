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

        const memberVoiceChannel = interaction.member.voice.channel
        if (!memberVoiceChannel) return interaction.reply({ content: ':x: | Você precisa estar em um canal de voz para usar este comando.', ephemeral: true })

        const player = this.client.manager.create({
          guild: interaction.guild.id,
          voiceChannel: interaction.member.voice.channel.id,
          textChannel: interaction.channel.id
      })
          if (player.state !== "CONNECTED") { 
            player.connect();
            player.stop();
          }
          else {
            var vc = player.voiceChannel;
            var voiceChannel = interaction.guild.channels.cache.get(player.voiceChannel);
            
            const embed = new MessageEmbed()
              .setColor('RANDOM')
              .setFooter(`${interaction.user.username}`, interaction.member.displayAvatarURL({ format:"png"}))
              .setTitle(`:x: | Já estou conectado em algum lugar`)
              .setDescription(`Estou conectado em: \`${vc ? voiceChannel ? voiceChannel.name : vc : "não foi possível obter dados do canal de voz"}\``)

            return interaction.channel.send({ embeds: [embed] })
          }
        }
    }