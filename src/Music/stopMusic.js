module.exports = {
    async stop(channel_setting) {
        if (channel_setting.voiceChannel) {
            channel_setting.voiceChannel.leave();
        }
        channel_setting.songs = [];
        channel_setting.running = 0;
        return;
    },

    async skipMusic(message, channel_setting) {

        if (channel_setting.running == 0) {
            return message.channel.send('播放器尚未啟動');
        }
        const args = message.content.split(" ");
        if (args.length == 1) {
            try { channel_setting.connection.dispatcher.end(); }
            catch (err) { console.log(err) }
        } else {
            let index = parseInt(args[1]);
            if (index == NaN) {
                return message.channel.send('請輸入數字');
            }
            if (index > channel_setting.songs.length) {
                return message.channel.send(`才${channel_setting.songs.length}首歌而已欸哥`);
            }
            index -= 1;
            if (index == 0) {
                channel_setting.connection.dispatcher.end();
            } else {
                channel_setting.songs.splice(index, 1);
            }
        }
    }
}