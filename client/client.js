// Copyright itsDkiller 2021. All Rights Reserved.
// Node module: pixelcity-login
// This file is licensed under the GNU General Public License v3.0 only.
// License text available at https://www.gnu.org/licenses/gpl-3.0-standalone.html

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