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