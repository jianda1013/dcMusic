const ytdl = require('ytdl-core');
const ytst = require('../YouTube/searchTitle');
const ytsl = require('../YouTube/searchList');
const fs = require('fs');

module.exports = {
    async add(message, channel_setting) {
        const regex = /^(?:https?:\/\/)?(?:(?:www\.)?youtube.com\/watch\?v=|youtu.be\/)(\w+)/;
        const args = message.content.substring(6);
        if (args.match(regex)) {
            const params = new URLSearchParams(args);
            if (params.has("list")) {
                await this.addMusicList(params.get('list'), channel_setting);
            } else {
                await this.addMusicURL(args, channel_setting);
            }
        } else {
            await this.addMusicTitle(args, channel_setting);
        }
        return;
    },

    async addMusicURL(url, channel_setting) {
        try {
            const song = await ytdl.getInfo(url);
            channel_setting.songs.push(song.videoDetails.video_url);
            fs.appendFileSync('/home/src//playlist', song+'\n');
        } catch (err) { console.log(err); }
    },

    async addMusicTitle(title, channel_setting) {
        const song = await ytst.searchByTitle(title);
        channel_setting.songs.push(song);
        fs.appendFileSync('/home/src//playlist', song+'\n');
    },

    async addMusicList(list_id, channel_setting) {
        await ytsl.searchByList(list_id)
            .then(song => {
                for (i in song) {
                    channel_setting.songs.push(song[i]);
                    fs.appendFileSync('/home/src//playlist', song[i]+'\n');
                }
            })
            .catch(err => { if (err) { console.log(err) } });
    }
}