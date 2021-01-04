const Discord = require('discord.js');

module.exports = {
    async instruct(message, param) {
        if (!param) {
            const embed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle("**指令集**")
                .addFields(
                    { name: '  指令         |     功能', value: '-----------------------------' },
                    { name: '  !help        |     指令集', value: '-----------------------------' },
                    { name: '  !play        |     點歌', value: '-----------------------------' },
                    { name: '  !skip        |     跳過當前歌曲', value: '-----------------------------' },
                    { name: '  !list        |     列出歌單', value: '-----------------------------' },
                    { name: '  !stop           |     停止播放', value: '-----------------------------' },
                    { name: '  !playlist        |     播放清單', value: '-----------------------------' },
                    { name: '  !addtolist     |     加入歌至播放清單', value: '-----------------------------' },
                    { name: '  !nowtolist    |     現在播放的歌加入清單', value: '-----------------------------' },
                )
            await message.channel.send(embed);

            message.channel.send('目前尚未開放重複歌單功能');
        }
    }
}