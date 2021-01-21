const { logger }   = require('./logger/logger');
const { database } = require('./database/database');
const { handler }  = require('./commands/commandHandler');
const config       = require('./config.json');

const Discord      = require('discord.js');

const client       = new Discord.Client({ fetchAllMembers: true });


async function start() {

    await handler.loadCommandFiles();
    logger.displayInfo('Start', 'Loaded all discord command files');

    await client.login(config.token);
    logger.displayInfo('Start', 'Discord client succesfully logged in as ' + client.user.tag);
}

start();