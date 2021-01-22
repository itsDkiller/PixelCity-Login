// Copyright itsDkiller 2021. All Rights Reserved.
// Node module: pixelcity-login
// This file is licensed under the GNU General Public License v3.0 only.
// License text available at https://www.gnu.org/licenses/gpl-3.0-standalone.html

const { logger }          = require('./logger/logger');
const { database }        = require('./database/database');
const { commandHandler }  = require('./commands/commandHandler');
const { eventHandler }    = require('./events/eventHandler');
const { client }          = require('./client/client');
const config              = require('./config.json');
const pack                = require('./package.json');


class PixelCityLogin {

    static async start() {
        logger.displayInfo('Start', 'Starting PixelCity-Login under version ' + pack.version);

        await database.sync();
        logger.displayInfo('Start', 'Synchronized the database content with the storage');

        await eventHandler.loadEventFiles();
        logger.displayInfo('Start', 'Loaded all discord event files');

        await commandHandler.loadCommandFiles();
        logger.displayInfo('Start', 'Loaded all discord command files');

        await client.login(config.token);
        logger.displayInfo('Start', 'Discord client succesfully logged in as ' + client.user.tag);
    }
}

PixelCityLogin.start();