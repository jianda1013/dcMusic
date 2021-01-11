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
                { name: '  !stop           |     停止播放', value: '-----------------------------' },
            )
        return message.channel.send(embed);
    },
}