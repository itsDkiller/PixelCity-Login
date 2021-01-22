const { Event } = require('../Event');

class ReadyEvent extends Event {

    constructor() {
        super('ready', false);
    }

    execute() {
        console.log('Emit ready event');
    }
}