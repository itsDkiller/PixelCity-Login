// Copyright itsDkiller 2021. All Rights Reserved.
// Node module: pixelcity-login
// This file is licensed under the GNU General Public License v3.0 only.
// License text available at https://www.gnu.org/licenses/gpl-3.0-standalone.html

class Event {

    #name
    #once
    
    /**
     * @param {String} name The discord.js client event name
     * @param {Boolean} once Wether to execute the event once or always
     */
    constructor(name, once) {
        this.#name = name;
        this.#once = once;
    }

    /**
     * @returns {String}
     */
    get name() {
        return this.#name;
    }

    /**
     * @returns {String}
     */
    get once() {
        return this.#once;
    }
}

module.exports = {
    Event
}