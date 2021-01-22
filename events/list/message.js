// Copyright itsDkiller 2021. All Rights Reserved.
// Node module: pixelcity-login
// This file is licensed under the GNU General Public License v3.0 only.
// License text available at https://www.gnu.org/licenses/gpl-3.0-standalone.html

const { Event }          = require('../Event');
const { Message }        = require('discord.js');
const { dmManager }      = require('../../dm/dmManager');
const { commandHandler } = require('../../commands/commandHandler');
const prefix             = require('../../config.json').prefix;

class MessageEvent extends Event {

    constructor() {
        super('message');
    }

    /**
     * 
     * @param {Message} message The discord message that emit this event
     */
    execute(client, message) {
        if (message.author.bot) return;
        if (message.channel.type === "dm") return dmManager.handleMessage(message);
        if (!message.content.startsWith(prefix)) return;

        commandHandler.handleMessage(client, message);
    }
}

module.exports = MessageEvent;