const ytdl = require('ytdl-core');
const playMusic = require('./playMusic');
const yts = require( 'yt-search' );

module.exports = {
    async AddMusic(message, channel_setting) {
        const args = message.content.substring(6);
        let song;
        try {
            const songInfo = await ytdl.getInfo(args);
            song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
                player: message.author.username
            };
        } catch {
            const songInfo = (await yts(args)).videos[0];
            song = {
                title: songInfo.title,
                url: songInfo.url,
                player: message.author.username
            }
        }
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