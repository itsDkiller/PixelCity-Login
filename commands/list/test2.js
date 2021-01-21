const { Command } = require('../Command');

class Test2Command extends Command {

    constructor() {
        super('test2', 'The second command', ['penis', 'allahuakbar'], ['422403143981203456']);
    }

    execute(client, message, args) {}

}

module.exports = Test2Command