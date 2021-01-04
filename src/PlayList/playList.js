const DB = require('../DB');

module.exports = {
    async showPlayList(message, channel_setting) {
        const args = message.content.split(" ");
        if (args.length != 1) {
            this.showSongList(parseInt(args[1]), channel_setting);
            return;
        }
        const list = await DB.playList.findAll({});
        let song = "`";
        for (let i = 0; i < list.length; i++) {
            song += (list[i].id + " " + list[i].list_name + '\n');
        }
        song += "`";
        channel_setting.textChannel.send(song);
    },

    async showSongList(playNo, channel_setting) {
        if (isNaN(playNo)) { return channel_setting.textChannel.send('請輸入數字唷'); }
        const list = await DB.song.findAll({where: {
            list_id: playNo
        }});
        let song = "`";
        for (let i = 0; i < list.length; i++) {
            song += (list[i].id + " " + list[i].song_name + '\n');
        }
        song += "`";
        return channel_setting.textChannel.send(song);
    }
}