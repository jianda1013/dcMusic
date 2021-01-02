const ytdl = require('ytdl-core');

module.exports = {

    async AddMusic(message, channel_setting) {
        const args = message.content.split(" ");
        try {
            const songInfo = await ytdl.getInfo(args[1]);
            var song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
            };
            channel_setting.songs.push(song);
            if(channel_setting.songs.length == 1){
                
            }
        } catch {
            return message.channel.send('給個正常的yt url啦乾')
        }
    },

    async playMusic(channel_setting) {
        if(channel_setting.songs){
            
        }
    },

    async skip(message, queue) {

    },

    async stop() {

    }
}