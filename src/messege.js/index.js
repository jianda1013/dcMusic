const musicFunc = require('./music');
module.exports = function (client) {

    var setting = null;

    client.once('ready', () => {
        console.log('Ready!');
    });

    client.once('disconnect', () => {
        console.log('Disconnect!');
    });

    client.on('message', async message => {
        if (message.author.bot) {
            return;
        }
        if (!message.content.startsWith('!')) {
            return;
        }
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.channel.send('先加入個語音頻道吧');
        }
        if(!setting){
            setting = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            };
            setting.connection = await voiceChannel.join();
        }
        if (message.content.startsWith('!play')) {
            musicFunc.AddMusic(message, setting);
            return;
        } else if (message.content.startsWith('!skip')) {
            skip(message, setting);
            return;
        } else if (message.content.startsWith('!stop')) {
            stop(message, setting);
            return;
        } else {
            message.channel.send("You need to enter a valid command!");
        }
    });
}