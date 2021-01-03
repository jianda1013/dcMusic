const editMusic = require('./editMusic');

module.exports = {
    async playMusic(channel_setting) {
        console.log(channel_setting.songs);
        if (!channel_setting.songs.length) {
            editMusic.killAll(channel_setting);
            return;
        }else{
            const dispatcher = channel_setting.connection
            .play(ytdl(channel_setting.songs[0].url))
            .on('finish', ()=>{
                channel_setting.songs.shift();
                this.playMusic(channel_setting);
            })
            .on('error', error=>console.log(error));
            dispatcher.setVolumeLogarithmic(channel_setting.volume / 5);
            channel_setting.textChannel.send(`now playing ${channel_setting.songs[0].title}`)
        }
    }
}