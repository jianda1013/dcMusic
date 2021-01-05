const Discord = require('discord.js');
const Music = require('./Music');
const usage = require('./Setting/usage');
const playList = require('./PlayList');
const fs = require('fs');
const setting = require('../config.json');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
    setting.textChannel = client.channels.cache.find(channel => channel.name === '一般');
    setting.voiceChannel = client.channels.cache.find(channel => channel.name === '語音');
    if (fs.existsSync('./playlist/' + setting.playlist)) {
        fs.readFile('./playlist/' + setting.playlist, 'utf8', (err, data) => {
            if (err) { console.log(err) }
            const arr = data.split("\n");
            for (i in arr) {
                try {
                    setting.songs.push(JSON.parse(arr[i]));
                }
                catch (err) {
                    continue;
                }
            }
        })
    } else {
        fs.open('./playlist/' + setting.playlist, 'w', err => { if (err) { console.log(err) } });
    }
});

client.on('message', async message => {

    if (message.author.bot) { return; }
    if (message.channel != setting.textChannel) { return; }
    if (!message.content.startsWith('!')) { return; }

    fs.appendFile('./historylog', ((new Date()).toString() + ', ' + message.author.username + ', ' + message.content + '\n'), err => { if (err) { console.log(err); } })

    if (message.content === '!help') { usage.instruct(message); }
    else if (message.content.startsWith('!help ')) { usage.help(message); }
    else if (message.content.startsWith('!play')) { Music.addMusic(message, setting); }
    if (!setting.textChannel) { return message.channel.send('先點個歌 不然會發呆'); }
    else if (message.content.startsWith('!skip')) { Music.skipMusic(message, setting); }
    else if (message.content === '!stop') { Music.stopMusic(message, setting); }
    else if (message.content === '!list') { Music.listMusic(message, setting); }
    else if (message.content.startsWith('!playlist')) { playList.showPlayList(message, setting); }
    else if (message.content.startsWith('!addtolist')) { playList.addMusicToList(message, setting); }
    else if (message.content === '!nowtolist') { playList.nowToList(message, setting); }
});

client.login(process.env.DC_TOKEN);