module.exports = {
    async listMusic(message, channel_setting) {
        if (channel_setting.running == 0) {
            return message.channel.send('播放器尚未啟動')
        }
        if (message.member.voice.channel != channel_setting.voiceChannel) {
            return message.channel.send('你不在播放頻道裡面喔');
        }
        const len = channel_setting.songs.length;
        let msg = "`";
        for (let i = 0; i < len; i++) {
            msg += (i + 1) + '. ' + channel_setting.songs[i].title + '\n';
            if(msg.length > 1800){
                msg += '`';
                message.channel.send(msg);
                msg = "`";
            }
        }
        msg += '`';
        return message.channel.send(msg);
    }
}