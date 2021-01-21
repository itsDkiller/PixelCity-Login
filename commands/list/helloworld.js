const { Command } = require('../Command');

class HelloWorldCommand extends Command {

    constructor() {
        super('helloworld', 'A general testing command', ['hello', 'world'], ['422403143981203456']);
    }

    execute(client, message, args) {
        console.log('test');
    }

}

module.exports = HelloWorldCommand