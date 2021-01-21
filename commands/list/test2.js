// Copyright itsDkiller 2021. All Rights Reserved.
// Node module: pixelcity-login
// This file is licensed under the GNU General Public License v3.0 only.
// License text available at https://www.gnu.org/licenses/gpl-3.0-standalone.html

const { Command } = require('../Command');

class Test2Command extends Command {

    constructor() {
        super('test2', 'The second command', ['penis', 'allahuakbar'], ['422403143981203456']);
    }

    execute(client, message, args) {}

}

module.exports = Test2Command