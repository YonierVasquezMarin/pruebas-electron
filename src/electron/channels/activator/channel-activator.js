const fs = require('fs');
const path = require('path');

class ChannelsActivator {
    #parameters

    constructor(parameters) {
        this.#parameters = parameters
    }

    activateChannels() {
        const channels = fs.readdirSync(path.resolve(__dirname, '../channels'));
        channels.forEach(file => {
            const filePath = path.resolve(__dirname, '../channels', file);
            const channel = require(filePath);
            channel(this.#parameters);
        });
    }
}

module.exports = ChannelsActivator