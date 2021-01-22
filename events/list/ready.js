// Copyright itsDkiller 2021. All Rights Reserved.
// Node module: pixelcity-login
// This file is licensed under the GNU General Public License v3.0 only.
// License text available at https://www.gnu.org/licenses/gpl-3.0-standalone.html

const { Event } = require('../Event');

class ReadyEvent extends Event {

    constructor() {
        super('ready', false);
    }

    execute() {}
}

module.exports = ReadyEvent;