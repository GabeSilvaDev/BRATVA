const { Client } = require('discord.js')
const { spawn, spawnSync } = require("child_process")
const moment = require("moment")
const time = moment().unix()

const { readdirSync, appendFileSync, unlinkSync, mkdirSync, rmdirSync } = require('fs')
const { join } = require('path')
const { config } = require("dotenv");
config({
    path: __dirname + "/.env"
});


const { connect } = require('mongoose')
const Models = require('../database/models/Models')

const erelaManager = require('./Manager')

module.exports = class extends Client {
    constructor (options) {
        super(options)

        this.commands = []
        this.loadCommands()
        this.loadEvents()
        this.manager = erelaManager(this)
    }

    registryCommands() {
        // temporária
        //this.guilds.cache.get('877801686918385724').commands.set(this.commands)
        this.application.commands.set(this.commands)
    }

    loadCommands(path = "src/commands") {
        const categories = readdirSync(path)

        for (const category of categories) {
            const commands = readdirSync(`${path}/${category}`)

            for (const command of commands) {
                const commandClass = require(join(process.cwd(), `${path}/${category}/${command}`))
                const cmd = new (commandClass)(this)

                this.commands.push(cmd)
            }
        }
        console.log("[Comandos] Carregados com Sucesso!")
    }

    loadEvents(path = 'src/events') {
        const categories = readdirSync(path)

        for (const category of categories) {
            const events = readdirSync(`${path}/${category}`)

            for (const event of events) {
                const eventClass = require(join(process.cwd(), `${path}/${category}/${event}`))
                const evt = new (eventClass)(this)

                this.on(evt.name, evt.run)
            }
        }
        console.log("[Eventos] Carregados com Sucesso!")
    }

    async connectToDatabase() {
        const connection = await connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => console.log('[DataBase] Conectada com Sucesso!'));


        this.db = { connection, ...Models }
    }
}