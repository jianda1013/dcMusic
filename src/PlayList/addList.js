const DB = require('../DB');
const ytdl = require('ytdl-core');
const yts = require('yt-search');

module.exports = {

    async addMusicToList(message, channel_setting) {
        const args = message.content.split(" ");
        const len = args.length;
        if (len === 1) { return channel_setting.textChannel.send(`無效的加入歌單方式喔`); }
        let music = "", list_id;
        if (len === 2) {
            list_id = 1;
            music = args[1];
        } else {
            for (let i = 1; i < len - 1; i++) { music += (args[i] + " "); }
            list_id = parseInt(args[len - 1]);
            if (isNaN(list_id)) {
                list_id = 1;
                music += args[len - 1];
            }
        }
        const check = await DB.playList.count({ where: { id: list_id } })
        if (check != 1) { return channel_setting.textChannel.send(`未找到${list_id}號歌單`); }
        let title, url;
        try {
            const songInfo = await ytdl.getInfo(music);
            title = songInfo.videoDetails.title;
            url = songInfo.videoDetails.video_url;
        } catch {
            const songInfo = (await yts(music)).videos[0];
            title = songInfo.title;
            url = songInfo.url;
        }
        await DB.song.create({
            song_name: title,
            song_url: url,
            list_id: list_id,
            create_date: new Date()
        })
        return channel_setting.textChannel.send(`加入${title}成功`);
    },

    async nowToList(message, channel_setting) {
        if (channel_setting.running === 0) {
            return channel_setting.textChannel.send('播放器尚未啟動');
        }
        const args = message.content.split(" ");
        let list_id;
        if (args.length === 1) {
            list_id = 1;
        } else {
            list_id = parseInt(args[1]);
            if (isNaN(list_id)) {
                list_id = 1;
            }
        }
        const check = await DB.playList.count({
            where: {
                id: list_id
            }
        })
        if (check != 1) {
            return channel_setting.textChannel.send(`未找到${list_id}號歌單`);
        }
        const music = channel_setting.songs[0];
        await DB.song.create({
            song_name: music.title,
            song_url: music.url,
            list_id: list_id,
            create_date: new Date()
        });
        return channel_setting.textChannel.send(`加入${title}成功`);
    }
}