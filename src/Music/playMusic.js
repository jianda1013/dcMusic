const editMusic = require('./editMusic');
const ytdl = require('ytdl-core');

module.exports = {
    async playFromStop(channel_setting) {
        if (channel_setting.songs && channel_setting.running === 0) {
            channel_setting.running = 1;
            try {
                var connection = await channel_setting.voiceChannel.join();
                channel_setting.connection = connection;
                this.playMusic(channel_setting);
            } catch (err) {
                channel_setting.running = 0;
                console.log(err);
                return;
            }
        }
    },

    async playMusic(channel_setting) {
        if(channel_setting.continue){
            this.playContinue(channel_setting);
            return;
        }
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
    },

    async playContinue(channel_setting) {
        if(!channel_setting.continue){
            this.playMusic(channel_setting);
            return;
        }
        if (!channel_setting.songs.length) {
            editMusic.killAll(channel_setting);
            return;
        }else {
            if(channel_setting.playingNow === 0 || channel_setting.playingNow === channel_setting.songs.length){
                channel_setting.songs = channel_setting.songs.sort(()=> Math.random() - 0.5);
                channel_setting.playingNow = 0;
            }
            const dispatcher = channel_setting.connection
                .play(ytdl(channel_setting.songs[channel_setting.playingNow].url))
                .on('finish', () => {
                    channel_setting.playingNow += 1;
                    this.playMusic(channel_setting);
                })
                .on('error', error => console.log(error));
            dispatcher.setVolumeLogarithmic(channel_setting.volume / 5);
        }
    }
}