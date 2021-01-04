const editMusic = require('./editMusic');
const ytdl = require('ytdl-core');

module.exports = {
    async playMusic(channel_setting) {
        if (!channel_setting.songs.length) {
            editMusic.killAll(channel_setting);
            return;
        } else {
            const dispatcher = channel_setting.connection
                .play(ytdl(channel_setting.songs[0].url))
                .on('finish', () => {
                    channel_setting.songs.shift();
                    this.playMusic(channel_setting);
                })
                .on('error', error => console.log(error));
            dispatcher.setVolumeLogarithmic(channel_setting.volume / 5);
        }
    }
}