const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const ms = require("ms");

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            description: 'Silencia um usuário!'
        })
    }

    run = (interaction) => {
        
        interaction.reply("Em teste para executar com banco de dados!");

    }
}