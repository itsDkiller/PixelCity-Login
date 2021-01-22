// Copyright itsDkiller 2021. All Rights Reserved.
// Node module: pixelcity-login
// This file is licensed under the GNU General Public License v3.0 only.
// License text available at https://www.gnu.org/licenses/gpl-3.0-standalone.html

const colors     = require('colors');
const dateformat = require('dateformat');

class Logger {

    /**
     * @param {string} prefix Prefix to display after the timestamp
     */
    constructor(prefix) {
        this.prefix = prefix;
    }

    /**
     * @param {string} info Info message to display
     * @param {string} location Location of the information message
     */
    displayInfo(location, info) {
        return console.log(`[`.grey + `${this.parseDateToString()}`.white + `]`.grey + `[`.grey + `${this.prefix} `.green + `- `.grey + `INFO`.cyan + `] `.grey + `${location}: ${info}`.white);
    }

    /**
     * 
     * @param {string} warning Warning message to display
     * @param {string} location Location of the warning message
     */
    displayWarning(location, warning) {
        return console.log(`[`.grey + `${this.parseDateToString()}`.white + `]`.grey + `[`.grey + `${this.prefix} `.green + `- `.grey + `WARNING`.yellow + `] `.grey + `${location}: ${warning}`.white);
    }

    /**
     * @param {string} error Error message to display
     * @param {string} location Location of the error message
     */
    displayError(location, error) {
        return console.log(`[`.grey + `${this.parseDateToString()}`.white + `]`.grey + `[`.grey + `${this.prefix} `.green + `- `.grey + `ERROR`.red + `] `.grey + `${location}: ${error}`.white);
    }

    /**
     * @returns {string} Parsed date format
     */
    parseDateToString() {
        return dateformat(new Date(), "yyyy-mm-dd h:MM:ss");
    }
}

const logger = new Logger('PixelCity-Login');

module.exports = {
    logger
}