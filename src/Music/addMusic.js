const ytdl = require('ytdl-core');
const playMusic = require('./playMusic');
const ytst = require('../YouTube/searchTitle');
const ytsl = require('../YouTube/searchList');
const fs = require('fs');

module.exports = {
    async add(message, channel_setting) {
        //check if is 
        if(message.content.length < 6){ playMusic.play(channel_setting); return; }
        const regex = /^(?:https?:\/\/)?(?:(?:www\.)?youtube.com\/watch\?v=|youtu.be\/)(\w+)/;
        const args = message.content.substring(6);
        if (args.match(regex)) {
            const params = new URLSearchParams(args);
            if (params.has("list")) {
                this.addMusicList(params.get('list'), channel_setting);
            } else {
                this.addMusicURL(args, channel_setting);
            }
        } else {
            this.addMusicTitle(args, channel_setting);
        }
        playMusic.play(channel_setting);
        return;
    },

    async addMusicURL(url, channel_setting) {
        try {
            const songInfo = await ytdl.getInfo(url);
            const song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
            };
            channel_setting.songs.push(song);
            fs.appendFile('./playlist/' + channel_setting.playlist, JSON.stringify(song) + '\n', err => { console.log(err) })
        } catch (err) { console.log(err); }
    },

    async addMusicTitle(title, channel_setting) {
        const song = await ytst.searchByTitle(title);
        channel_setting.songs.push(song);
        fs.appendFile('./playlist/' + channel_setting.playlist, JSON.stringify(song) + '\n', err => { console.log(err) })
    },

    async addMusicList(list_id, channel_setting) {
        await ytsl.searchByList(list_id)
            .then(result => {
                for (i in result) {
                    fs.appendFile('./playlist/' + channel_setting.playlist, JSON.stringify(result[i]) + '\n', err => { if (err) { console.log(err) } })
                }
                Array.prototype.push.apply(channel_setting.songs, result);
            })
            .catch(err => { if (err) { console.log(err) } });
    }
}