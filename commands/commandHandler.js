// Copyright itsDkiller 2021. All Rights Reserved.
// Node module: pixelcity-login
// This file is licensed under the GNU General Public License v3.0 only.
// License text available at https://www.gnu.org/licenses/gpl-3.0-standalone.html

const { Message, Client } = require('discord.js');
const { logger }          = require('../logger/logger');
const fs                  = require('fs');
const prefix              = require('../config.json').prefix;
const { Command }         = require('./Command');

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
     * @param {Array} givenArgs The arguments that were given
     * @param {Command} commandClass Command instance
     * @returns {Promise}
     */
    sendMissingArgumentsError(givenArgs, commandClass) {
        return new Promise((resolve, reject) => {
            if (givenArgs.length > commandClass.arguments.length) {
                message.channel.send('Es wurden zu viele Argumente übergeben.\n Benutzung: `' + prefix + commandClass.name + commandClass.arguments.join(' '));
                return resolve();
            } else {
                let newArr = [];
                for (i = 0; i < commandClass.arguments.length; i++) {
                    if (givenArgs[i]) {
                        return newArr.push(commandClass.arguments[i]);
                    } else {
                        return newArr.push('!' + commandClass.arguments[i]);
                    }
                }
                message.channel.send('Es wurden nicht genug Argumente angegeben. Benutzung: `' + prefix + commandClass.name + newArr.join(" "));
                return resolve();
            }
        });
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

                       for (let alias in command.aliases) {
                           if (map.has(alias)) return;
                           map.set(alias, command);
                       }
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
     * @param {Client} client The discord client instance
     */
    handleMessage(client, message) {
            let name = message.content.split(' ')[0].substring(prefix.length);
            let args = message.content.split(' ').slice(1);

            if (this.#commands.has(name)) {
                let command = this.#commands.get(name);

                if (message.member.roles.cache.some(r => command.allowedRoleIDs.includes(r.id))) {
                    if (args.length !== command.arguments.length) return this.sendMissingArgumentsError();
                    command.execute(client, message, args);

                } else return this.sendNoPermissionError(message);

            } else return;
    }
}

const commandHandler = new CommandHandler();

module.exports = {
    commandHandler
}