const Discord = require('discord.js');

module.exports = {
    async instruct(message) {
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
        return message.channel.send(embed);
    },

    async help(message) {
        const instruction = message.content.substring(6);
        let return_msg = "";
        if (instruction === 'play') {
            return_msg += ` 
            **    play      播放音樂**
  !play  歌曲網址          :     播放單曲
  !play  歌單網址          :     播放清單
  !play  歌名                   :     yt搜尋第一個結果播放
  !play                              :     現有歌單播放
            `
        } else if (instruction === 'skip') {
            return_msg += ` 
            **    skip      跳過音樂**
  !skip   歌曲編號                           :     此曲移除清單
  !skip   (循環模式)                        :     跳過當前歌曲
  !play   (非循環模式)                   :    移除當前歌曲
            `
        } else if (instruction === 'stop') {
            return_msg += ` 
            **    stop      停止音樂**
  !stop          :     停止播放
            `
        } else if (instruction === 'list') {
            return_msg += ` 
            **    list      列出歌單**
  !list          :     列出當前歌單
            `
        }
        if (return_msg.length === 0) {
            this.instruct(message);
        }
        return message.channel.send(return_msg);;
    }
}