const { logger } = require('../logger/logger');
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
    loadEventFiles() {
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