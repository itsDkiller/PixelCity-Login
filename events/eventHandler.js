// Copyright itsDkiller 2021. All Rights Reserved.
// Node module: pixelcity-login
// This file is licensed under the GNU General Public License v3.0 only.
// License text available at https://www.gnu.org/licenses/gpl-3.0-standalone.html

const { logger } = require('../logger/logger');
const { client } = require('../client/client');
const fs         = require('fs');

class EventHandler {

    #events

    /**
     * @returns {Map}
     */
    get events() {
        return this.#events;
    }

    /**
     * @returns {Promise}
     */
    bindEventFiles() {
        return new Promise((resolve, reject) => {
            try {
                fs.readdir(__dirname + '/list', (err, files) => {
                    let map = new Map();

                    for (let file of files) {
                        if (!file.endsWith('.js')) return;

                        let eventClass = require(__dirname + '/list/' + file);
                        let event      = new eventClass();
                        let eventName  = event.name;

                        map.set(eventName, event);

                        client.on(eventName, event.execute.bind(0, client));
                    }
                    this.#events = map;
                    return resolve();
                });
            } catch {
                logger.displayError('EventHandler', 'There was an error while loading the event files');
                return reject('Error while loading the event files');
            }
        });
    }
}

const eventHandler = new EventHandler();

module.exports = {
    eventHandler
}