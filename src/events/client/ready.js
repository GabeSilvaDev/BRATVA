const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }

    run = async () => {
        console.log(`[${this.client.user.username}] Logado com Sucesso em: ${this.client.guilds.cache.size} Servidores!`)
        this.client.registryCommands()
        await this.client.connectToDatabase()

        this.client.manager.init(this.client.user.id)
    }
}