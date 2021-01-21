class Command {

    #name
    #description
    #aliases
    #allowedRoleIDs

    /**
     * @param {string} name The command name
     * @param {string} description The description of the command
     * @param {Array} aliases The aliases of the command
     * @param {Array} allowedRoleIDs The role IDs that should be allowed to use this command
     */
    constructor(name, description, aliases, allowedRoleIDs) {
        this.#name            = name;
        this.#description     = description;
        this.#aliases         = aliases;
        this.#allowedRoleIDs  = allowedRoleIDs;
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
}

module.exports = {
    Command
}