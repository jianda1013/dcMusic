const ytdl = require('ytdl-core-discord');
const fs = require('fs');

module.exports = {

    async start(channel_setting) {
        const music = (fs.readFileSync('/home/src/playlist', 'utf8')).split("\n");
        const regex = /^(?:https?:\/\/)?(?:(?:www\.)?youtube.com\/watch\?v=|youtu.be\/)(\w+)$/;
        for (i in music) {
            if (music[i].match(regex)) {
                channel_setting.songs.push(music[i]);
            }
        }
        this.play(channel_setting)
    },

    async play(channel_setting) {
        if (channel_setting.songs) {
            const connection = await channel_setting.voiceChannel.join();
            channel_setting.connection = connection;
            await this.playMusic(channel_setting);
        }
    },

    async playMusic(channel_setting) {
        if (channel_setting.playingNow === 0 || channel_setting.playingNow === channel_setting.songs.length) {
            channel_setting.songs = channel_setting.songs.sort(() => Math.random() - 0.5);
            channel_setting.playingNow = 0;
        }
        const dispatcher = channel_setting.connection
            .play(await ytdl(channel_setting.songs[channel_setting.playingNow]), { type: 'opus' })
            .on('finish', async () => {
                channel_setting.playingNow += 1;
                await this.playMusic(channel_setting);
            })
            .on('error', error => console.log(error));
        dispatcher.setVolumeLogarithmic(1);

    },
}