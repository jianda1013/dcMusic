module.exports = {
    async stop(channel_setting) {
        if (channel_setting.voiceChannel) {
            channel_setting.voiceChannel.leave();
        }
        return;
    },

    async skipMusic(channel_setting) {
        try { channel_setting.connection.dispatcher.end(); }
        catch (err) { console.log(err) }
    }
}