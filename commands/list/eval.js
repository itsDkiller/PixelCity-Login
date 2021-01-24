// Copyright itsDkiller 2021. All Rights Reserved.
// Node module: pixelcity-login
// This file is licensed under the GNU General Public License v3.0 only.
// License text available at https://www.gnu.org/licenses/gpl-3.0-standalone.html

const { Command }         = require('../Command');
const { Client, Message } = require('discord.js');
const vm                  = require('vm');

class EvalCommand extends Command {

    constructor() {
        super('eval', 'Execute JavaScript code directly', [], ['481102427127414788'], []);
    }

    /**
     * @param {Client} client
     * @param {Message} message 
     * @param {Array} args 
     */
    execute(client, message, args) {
        let context = vm.createContext({ client: client, message: message });

        try {
            let output = vm.runInContext(args.join(" "), context);
            message.channel.send('Ausgabe: ' + output);
        } catch(err) {
            message.channel.send('Beim Eval-Command trat folgender Fehler auf: \n' + '```' + err + '```');
        }
    }

}

module.exports = EvalCommand