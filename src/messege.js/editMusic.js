module.exports = {
    async killAll(channel_setting) {
        if(channel_setting.voiceChannel){
            channel_setting.voiceChannel.leave();
        }
        channel_setting.running = 0;
        channel_setting.songs = [];
        return;
    },

    async skip(message, channel_setting) {
        if(channel_setting.running == 0){
            return message.channel.send('播放器尚未啟動')
        }
        if(message.member.voice.channel != channel_setting.voiceChannel){
            return message.channel.send('你不在播放頻道裡面喔');
        }
        channel_setting.connection.dispatcher.end();
    },

    async stop(message, channel_setting) {
        if(channel_setting.running == 0){
            return message.channel.send('播放器尚未啟動')
        }
        if(message.member.voice.channel != channel_setting.voiceChannel){
            return message.channel.send('你不在播放頻道裡面喔');
        }
        this.killAll(channel_setting);
    }
}