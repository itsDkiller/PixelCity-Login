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