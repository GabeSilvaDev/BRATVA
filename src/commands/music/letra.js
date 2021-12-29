const { default: axios } = require('axios');
const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'letra',
            description: 'Mostra a letra de uma música!',
            premium: false,
            options: [
                {
                    name: 'titulo',
                    description: "Titulo da musica!",
                    type: 'STRING',
                    required: true,
                }
            ],
        })
    }

    run = async (interaction) => {
        interaction.reply({ content: 'Em construção', ephemeral: true });

        
        /*function substring(length, value) {
            const replaced = value.replace(/\n/g, "--");
            const regex = `.{1,${length}}`;
            const lines = replaced.match(new RegExp(regex, "g")).map(line => line.replace('--', "\n"));

            return lines;
        }

        const Titulo = interaction.options.getString("titulo");

        const url = new URL('https://some-ramdom-api.nl/lyrics');
        url.searchParams.append('title', Titulo)
        console.log('url', url)

        try {
            const { data } = await axios.get(url.href)
            const embeds = substring(500, data.lyrics).map((value, index) => {
                const isFirst = index === 0;

                return new MessageEmbed({ title: ifFirst ? `${data.title} - ${data.author}` : null,
                                            thumbnail: ifFirst ? data.thumbnail.genius : null,
                                            description: value,
                                        });
            });

            return interaction.followUp({ embeds });
        } catch(err) {
            interaction.followUp({ content: "Ocorreu um erro ao achar a letra da musica" })
        }*/
    }
}