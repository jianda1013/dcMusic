const ytdl = require('ytdl-core');
const playMusic = require('./playMusic');

module.exports = {
    async AddMusic(message, channel_setting) {
        const args = message.content.split(" ");
        try {
            songInfo = await ytdl.getInfo(args[1])
        } catch {
            return message.channel.send('給個正常的yt url啦乾')
        }
        var song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
        };
        channel_setting.songs.push(song);
        if(channel_setting.running == 0){
            channel_setting.running = 1;
            channel_setting.textChannel = message.channel;
            channel_setting.voiceChannel = message.member.voice.channel;
            try {
                var connection = await channel_setting.voiceChannel.join();
                channel_setting.connection = connection;
                playMusic.playMusic(channel_setting);
            }catch(err){
                channel_setting.running = 0;
                console.log(err);
                return;
            }
        }else{
            return message.channel.send(`${song.title} 加入播放清單`)
        }
    }
}