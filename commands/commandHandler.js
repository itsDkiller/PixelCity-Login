const { logger } = require('../logger/logger');
const fs         = require('fs');
const underscore = require('underscore');

let client;

class CommandHandler {

    #commands

    /**
     * @returns {Map}
     */
    get commands() {
        return this.#commands;
    }

    sendNoPermissionError(message) {
        return message.channel.send('Die hast nicht die nötigen Berechtigungen.');
    }

    /**
     * @returns {Promise}
     */
    loadCommandFiles() {
        return new Promise((resolve, reject) => {
            try {
                fs.readdir('./commands/', (err, files) => {
                   const map = new Map();

                   for (const file of files) {
                       if (!file.endsWith('.js')) return;

                       let commandClass = require(file);
                       let command      = new commandClass();
                       let commandName  = command.name();

                       map.set(commandName, command);
                   }
                   this.#commands = map;
                   return resolve();
                });
            } catch(err) {
                logger.displayError('CommandHandler', 'There was an error while loading the command files');
                return reject('Error while loading the command files');
            }

        });
    }

    /**
     * @param {any} message The messageto handle
     */
    handleMessage(message) {
        try {
            let name = message.content.split(' ')[0].substring(1);
            let args = message.content.split(' ').shift();

            if (this.#commands.has(name)) {
                if (underscore.intersection(message.member.roles.cache, this.#commands.get(name).allowedRoleIDs()).length >= 1) {
                    this.#commands.get(name).execute(client, message, args);

                } else return this.sendNoPermissionError(message);

            } else if ([...this.#commands].find(([commandName, commandClass]) => commandClass.aliases().includes(name))) {

                if (underscore.intersection(message.member.roles.cache, [...this.#commands].find(([commandName, commandClass]) => commandClass.aliases()))) {
                    [...this.#commands].find(([commandName, commandClass]) => commandClass.aliases().includes(name)).execute(client, message, args);

                } else return this.sendNoPermissionError(message);

            } else return;

        } catch(err) {
            return logger.displayError('CommandHandler', 'An error occured while handling an incoming message');
        }
    }
}

const handler = new CommandHandler();

module.exports = {
    handler
}