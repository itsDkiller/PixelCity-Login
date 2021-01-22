// Copyright itsDkiller 2021. All Rights Reserved.
// Node module: pixelcity-login
// This file is licensed under the GNU General Public License v3.0 only.
// License text available at https://www.gnu.org/licenses/gpl-3.0-standalone.html

const { Event } = require('../Event');

class MessageEvent extends Event {

    constructor() {
        super('message', false);
    }

    execute(message) {
        console.log('Emit message event');
    }
}

module.exports = MessageEvent;