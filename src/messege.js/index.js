const editMusic = require('./editMusic');
const addMusic = require('./addMusic');

var setting = {
    running: 0,
    textChannel: null,
    voiceChannel: null,
    connection: null,
    songs: [],
    volume: 5,
    playing: true
};

module.exports = function (client) {

    client.once('ready', () => {
        console.log('Ready!');
    });

    client.once('disconnect', () => {
        console.log('Disconnect!');
    });

    client.on('message', async message => {
        // check bot or not
        if (message.author.bot) {
            return;
        }
        // start with prefix !
        if (!message.content.startsWith('!')) {
            return;
        }
        // if not in voicechannel
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.channel.send('先加入個語音頻道吧');
        }

        if (message.content.startsWith('!play')) {
            addMusic.AddMusic(message, setting);
            return;
        } else if(message.content.startsWith('!skip')) {
            editMusic.skip(message, setting);
        } else if(message.content.startsWith('!stop')) {
            editMusic.stop(message, setting);
        }
        else {
            message.channel.send("You need to enter a valid command!");
        }
    });
}