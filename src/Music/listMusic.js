module.exports = {
    async listMusic(message, channel_setting) {
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