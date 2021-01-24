// Copyright itsDkiller 2021. All Rights Reserved.
// Node module: pixelcity-login
// This file is licensed under the GNU General Public License v3.0 only.
// License text available at https://www.gnu.org/licenses/gpl-3.0-standalone.html

const { Command }         = require('../Command');
const { Client, Message } = require('discord.js');
const { database }        = require('../../database/database');
const prefix              = require('../../config.json').prefix;

class AddEntryCommand extends Command {

    constructor() {
        super('addentry', 'Add a player entry into the database', [], ['481102427127414788'], ['Discord ID', 'MCPE Name', 'Language']);
    }

    /**
     * @param {Client} client
     * @param {Message} message 
     * @param {Array} args 
     */
    execute(client, message, args) {
        if (!args[0] || !args[1] || !args[2]) { return message.channel.send('Es konnte kein Eintrag erstellt werden, da Argumente fehlen.\nBenutzung: `' + prefix + 'addentry <String id> <String ingame> <ger/eng language>`'); }
        if (database.checkEntry(args[0])) { return message.channel.send('Unter dieser ID existiert bereits ein Eintrag.'); }

        database.setEntry(args[0], args[1], args[2]);
        return message.channel.send('Der Eintrag wurde erstellt.');
    }

}

module.exports = AddEntryCommand