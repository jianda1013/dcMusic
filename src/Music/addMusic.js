const ytdl = require('ytdl-core');
const playMusic = require('./playMusic');
const ytst = require('../YouTube/searchTitle');
const ytsl = require('../YouTube/searchList');
const fs = require('fs');

module.exports = {
    async AddMusic(message, channel_setting) {
        const regex = /^(?:https?:\/\/)?(?:(?:www\.)?youtube.com\/watch\?v=|youtu.be\/)(\w+)/;
        const args = message.content.substring(6);
        if (args.length === 0) {
            playMusic.playFromStop(channel_setting);
            return;
        }
        if (args.match(regex)) {
            const params = new URLSearchParams(args);
            if (params.has("list")) {
                this.addMusicList(params.get('list'), channel_setting);
                return;
            } else {
                try {
                    const songInfo = await ytdl.getInfo(args);
                    song = {
                        title: songInfo.videoDetails.title,
                        url: songInfo.videoDetails.video_url,
                    };
                } catch (err) { console.log(err); }
            }
        } else {
            song = (await ytst.searchByTitle(args));
        }
        if (song == null) { return; }
        channel_setting.songs.push(song);
        fs.appendFile('./playlist/' + channel_setting.playlist, JSON.stringify(song) + '\n', err => { console.log(err) })
        playMusic.playFromStop(channel_setting);
        return;
    },

    async addMusicList(message, channel_setting) {
        await ytsl.searchByList(message)
            .then(result => {
                for (i in result) {
                    fs.appendFile('./playlist/' + channel_setting.playlist, JSON.stringify(result[i]) + '\n', err => { if (err) { console.log(err) } })
                }
                Array.prototype.push.apply(channel_setting.songs, result);
            })
            .catch(err => { if (err) { console.log(err) } });
        playMusic.playFromStop(channel_setting);
        return;
    }
}