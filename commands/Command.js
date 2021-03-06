// Copyright itsDkiller 2021. All Rights Reserved.
// Node module: pixelcity-login
// This file is licensed under the GNU General Public License v3.0 only.
// License text available at https://www.gnu.org/licenses/gpl-3.0-standalone.html

class Command {

    #name
    #description
    #aliases
    #allowedRoleIDs
    #arguments

    /**
     * @param {string} name The command name
     * @param {string} description The description of the command
     * @param {Array} aliases The aliases of the command
     * @param {Array} allowedRoleIDs The role IDs that should be allowed to use this command
     * @param {Array} arguments The list containing command arguments as strings
     */
    constructor(name, description, aliases, allowedRoleIDs) {
        this.#name           = name;
        this.#description    = description;
        this.#aliases        = aliases;
        this.#allowedRoleIDs = allowedRoleIDs;
        this.#arguments      = arguments;
    }

    /**
     * @returns {string}
     */
    get name() {
        return this.#name;
    }

    /**
     * @returns {string}
     */
    get description() {
        return this.#description;
    }

    /**
     * @returns {Array}
     */
    get aliases() {
        return this.#aliases;
    }

    /**
     * @returns {Array}
     */
    get allowedRoleIDs() {
        return this.#allowedRoleIDs;
    }

    /**
     * @returns {Array}
     */
    get arguments() {
        return this.#arguments;
    }
}

module.exports = {
    Command
}