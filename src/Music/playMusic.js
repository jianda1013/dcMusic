const stopMusic = require('./stopMusic');
const ytdl = require('ytdl-core');

module.exports = {
    async play(channel_setting) {
        if (channel_setting.songs && channel_setting.running === 0) {
            channel_setting.running = 1;
            try {
                var connection = await channel_setting.voiceChannel.join();
                channel_setting.connection = connection;
                await this.playMusic(channel_setting);
            } catch (err) {
                channel_setting.running = 0;
                console.log(err);
                return;
            }
        }
    },

    async playMusic(channel_setting) {
        if (channel_setting.continue) {
            await this.playContinue(channel_setting);
            return;
        }
        if (!channel_setting.songs.length || !channel_setting.running) {
            stopMusic.stop(channel_setting);
            return;
        } else {
            const dispatcher = channel_setting.connection
                .play(ytdl(channel_setting.songs[0].url))
                .on('finish', async() => {
                    channel_setting.songs.shift();
                    await this.playMusic(channel_setting);
                })
                .on('error', error => console.log(new Date(), error));
            dispatcher.setVolumeLogarithmic(channel_setting.volume / 5);
        }
    },

    async playContinue(channel_setting) {
        if (!channel_setting.continue) {
            await this.playMusic(channel_setting);
            return;
        }
        if (!channel_setting.songs.length || !channel_setting.running) {
            stopMusic.stop(channel_setting);
            return;
        } else {
            if (channel_setting.playingNow === 0 || channel_setting.playingNow === channel_setting.songs.length) {
                channel_setting.songs = channel_setting.songs.sort(() => Math.random() - 0.5);
                channel_setting.playingNow = 0;
            }
            const dispatcher = channel_setting.connection
                .play(ytdl(channel_setting.songs[channel_setting.playingNow].url))
                .on('finish', async() => {
                    channel_setting.playingNow += 1;
                    await this.playMusic(channel_setting);
                })
                .on('error', error => console.log(new Date(), error));
            dispatcher.setVolumeLogarithmic(1);
        }
    },
}