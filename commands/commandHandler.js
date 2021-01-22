// Copyright itsDkiller 2021. All Rights Reserved.
// Node module: pixelcity-login
// This file is licensed under the GNU General Public License v3.0 only.
// License text available at https://www.gnu.org/licenses/gpl-3.0-standalone.html

const { Message, Client } = require('discord.js');
const { logger }          = require('../logger/logger');
const fs                  = require('fs');
const underscore          = require('underscore');

class CommandHandler {

    #commands

    /**
     * @returns {Map}
     */
    get commands() {
        return this.#commands;
    }

    /**
     * @param {Message} message The message that should be answered with "missing permission error"
     */
    sendNoPermissionError(message) {
        return message.channel.send('Die hast nicht die nötigen Berechtigungen.');
    }

    /**
     * @returns {Promise}
     */
    loadCommandFiles() {
        return new Promise((resolve, reject) => {
            try {
                fs.readdir(__dirname + '/list/', (err, files) => {
                   let map = new Map();

                   for (let file of files) {
                       if (!file.endsWith('.js')) return;

                       let commandClass = require(__dirname + '/list/' + file);
                       let command      = new commandClass();
                       let commandName  = command.name;

                       map.set(commandName, command);
                   }
                   this.#commands = map;
                   return resolve();
                });
            } catch {
                logger.displayError('CommandHandler', 'There was an error while loading the command files');
                return reject('Error while loading the command files');
            }

        });
    }

    /**
     * @param {Message} message The message to handle
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

const commandHandler = new CommandHandler();

module.exports = {
    commandHandler
}