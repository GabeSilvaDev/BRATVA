const { MessageEmbed } = require('discord.js');
const { Manager } = require('erela.js')

module.exports = (client) => {
    return new Manager({
        nodes: [{
              host: "localhost",
              port: 2333,
               password: "discloud"
             }],
        send: (id, payload) => {
            const guild = client.guilds.cache.get(id)
            if (guild) guild.shard.send(payload)
        }
    })
        .on("nodeConnect", node => console.log(`[Node] Host: ${node.options.identifier} Conectada com Sucesso!`))
        .on("nodeError", (node, error) => console.log(
            `Node "${node.options.identifier}" Erro: ${error.message}.`
        ))
        .on("trackStart", (player, track) => {
            const channel = client.channels.cache.get(player.textChannel)

            //[${queue.current.title}](${queue.current.uri})
            const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Solicitado por ${track.requester.username}`)
            .setDescription(`Tocando agora: [${track.title}](${track.uri})`)
            .setTimestamp()
            //.setFooter("Desenvolvido Por: ! Gabriel「ᴏʟᴅ」#4482")
            

            channel.send({ embeds: [embed] })
        })
        .on("queueEnd", player => {
            const channel = client.channels.cache.get(player.textChannel)

            const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription("A PlayList de Músicas Acabou!")
            .setTimestamp()
            //.setFooter("Desenvolvido Por: ! Gabriel「ᴏʟᴅ」#4482")
            channel.send({ embeds: [embed]})
            //channel.send("Acabou")
            player.destroy()
        })
}