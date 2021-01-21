// Copyright itsDkiller 2021. All Rights Reserved.
// Node module: pixelcity-login
// This file is licensed under the GNU General Public License v3.0 only.
// License text available at https://www.gnu.org/licenses/gpl-3.0-standalone.html

const { logger }   = require('./logger/logger');
const { database } = require('./database/database');
const { handler }  = require('./commands/commandHandler');
const config       = require('./config.json');
const pack         = require('./package.json');

const Discord      = require('discord.js');

const client       = new Discord.Client({ fetchAllMembers: true });


class PixelCityLogin {

    static async start() {
        logger.displayInfo('Start', 'Starting PixelCity-Login under version ' + pack.version);

        await database.sync();
        logger.displayInfo('Start', 'Synchronized the database content with the storage');

        await handler.loadCommandFiles();
        logger.displayInfo('Start', 'Loaded all discord command files');

        await client.login(config.token);
        logger.displayInfo('Start', 'Discord client succesfully logged in as ' + client.user.tag);
    }
}

PixelCityLogin.start();