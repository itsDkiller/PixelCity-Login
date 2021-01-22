// Copyright itsDkiller 2021. All Rights Reserved.
// Node module: pixelcity-login
// This file is licensed under the GNU General Public License v3.0 only.
// License text available at https://www.gnu.org/licenses/gpl-3.0-standalone.html

const { Message, Client } = require('discord.js');
const { logger }          = require('../logger/logger');
const fs                  = require('fs');
const underscore          = require('underscore');
const prefix              = require('../config.json').prefix;

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
        return message.channel.send('Du hast nicht die nötigen Berechtigungen.');
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
     * @param 
     */
    handleMessage(client, message) {
            let name = message.content.split(' ')[0].substring(prefix.length);
            let args = message.content.split(' ').slice(1);

            if (this.#commands.has(name)) {
                if (message.member.roles.cache.some(r => this.#commands.get(name).allowedRoleIDs.includes(r))) {
                    this.#commands.get(name).execute(client, message, args);

                } else return this.sendNoPermissionError(message);

            } else if ([...this.#commands].find(([commandName, commandClass]) => commandClass.aliases.includes(name))) {
                if (message.member.roles.cache.some(r => [...this.#commands].find(([commandName, commandClass]) => commandClass.allowedRoleIDs.includes(r)))) {
                    [...this.#commands].find(([commandName, commandClass]) => commandClass.execute(client, message, args));

                } else return this.sendNoPermissionError(message);

            } else return;
    }
}

const commandHandler = new CommandHandler();

module.exports = {
    commandHandler
}