const ytdl = require('ytdl-core');
const playMusic = require('./playMusic');
const yts = require('yt-search');
const PlaylistSummary = require('youtube-playlist-summary');

module.exports = {
    async AddMusic(message, channel_setting) {
        const args = message.content.substring(6);
        if (args.indexOf("?list=") > -1 || args.indexOf("&list=") > -1) {
            this.addMusicList(args.slice(args.indexOf("&list=") + 6), channel_setting, message.author.username);
            return;
        }
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
        playMusic.playFromStop(channel_setting);
        return;
    },

    async addMusicList(message, channel_setting, username) {
        console.log(message);
        const ps = new PlaylistSummary({ GOOGLE_API_KEY: process.env.GOOGLE_API_KEY, PLAYLIST_ITEM_KEY: ['title', 'videoUrl'] });
        ps.getPlaylistItems(message)
            .then(result => {
                const len = result.items.length;
                for (let i = 0; i < len; i++) {
                    console.log(result.items[i]);
                    channel_setting.songs.push({
                        title: result.items[i].title,
                        url: result.items[i].videoUrl,
                        player: username
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
        playMusic.playFromStop(channel_setting);
        return;
    }
}