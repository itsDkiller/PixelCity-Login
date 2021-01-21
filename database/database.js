const JSONdb     = require('simple-json-db');
const { logger } = require('../logger/logger');

class Database {

    /**
     * @param {string} path The path of the json file to store entries in 
     */
    constructor(path) {
        this.db = new JSONdb(path);
    }

    /**
     * @param {string} id The discord ID of the player
     * @param {string} ingame The XBOX-Live name of the player
     * @param {string} language The language of the player
     */
    setEntry(id, ingame, language) {
        if (!this.db.has(id)) {
            return this.db.set(`${id}`, { ingame: `${ingame}`, language: `${language}`});
        } else return logger.displayError('Database', 'Attempt to create entry that already exists');
    }

    /**
     * @param {string} id The discord ID of the player
     */
    getEntryByID(id) {
        if (this.db.has(id)) {
            return this.db.get(id);
        } else return logger.displayError('Database', 'Attempt to get entry that does not exist');
    }

    /**
     * @param {string} id The discord ID of the player
     */
    checkEntry(id) {
        return this.db.has(id);
    }

    /**
     * @param {string} id The discord ID of the player
     */
    deleteEntry(id) {
        if (this.db.has(id)) {
            return this.db.delete(id);
        } else return logger.displayError('Database', 'Attempt to delete entry that does not exist');
    }

    /**
     * @param {string} id The discord ID of the player
     * @param {string} ingame The XBOX-Live name of the player
     * @param {string} language The language of the player
     */
    replaceEntry(id, ingame, language) {
        if (this.db.has(id)) {
            this.db.delete(id);
            return this.db.set(`${id}`, { ingame: `${ingame}`, language: `${language}`});
        } else return logger.displayError('Database', 'Attempt to replace entry that already exists');
    }

    /**
     * @returns {void}
     */
    async sync() {
        return this.db.sync();
    }

    /**
     * @returns {string}
     */
    get filepath() {
        return this.db.filePath;
    }
}

const database = new Database('./database/database.json');

module.exports = {
    database
};