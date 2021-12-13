const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            description: 'Toque uma música no canal de voz!',
            options: [
                {
                    name: 'música',
                    description: 'Música que você deseja que o bot toque!',
                    type: 'STRING',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        if (!interaction.member.voice.channel) return interaction.reply({ content: `:x: | Você não está em um canal de Voz!`, ephemeral: true })
        if (interaction.guild.me.voice.channel && interaction.guild.me.voice.channel.id !== interaction.member.voice.channel.id) return interaction.reply({ content: `:x: | Você não está no mesmo canal de Voz que eu!`, ephemeral: true })

        const search = interaction.options.getString('música')
        let res;

        try {
            res = await this.client.manager.search(search, interaction.user)

            if (res.loadType === "LOAD_FAILED") throw res.exception
            else if (res.loadType === "PLAYLIST_LOADED") throw { message: ":x: | Não aceito playlists!" }
        } catch (err) {
            return interaction.reply({ content: `:x: | Erro ao tentar buscar a música: ${err.message}`, ephemeral: true })
        }

        if (!res?.tracks?.[0]) return interaction.reply({ content: `:x: | Não encontramos a música solicitada!`, ephemeral: true })

        const player = this.client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id
        })

        if (player.state !== 'CONNECTED') player.connect()
        player.queue.add(res.tracks[0])

        if (!player.playing && !player.paused) player.play()

        return interaction.reply({ content: `:white_check_mark: | \`${res.tracks[0].title}\` Adicionada a Fila!` })
    }
}