// Copyright itsDkiller 2021. All Rights Reserved.
// Node module: pixelcity-login
// This file is licensed under the GNU General Public License v3.0 only.
// License text available at https://www.gnu.org/licenses/gpl-3.0-standalone.html

class Event {

    #name
    
    /**
     * @param {String} name The discord.js client event name
     */
    constructor(name) {
        this.#name = name;
    }

    /**
     * @returns {String}
     */
    get name() {
        return this.#name;
    }

}

module.exports = {
    Event
}