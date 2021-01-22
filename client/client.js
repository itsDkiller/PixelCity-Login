const Discord    = require('discord.js');
const config     = require('../config.json');

class Client extends Discord.Client {

    constructor() {
        super({ fetchAllMembers: true });
    }
}

const client = new Client();

module.exports = {
    client
}