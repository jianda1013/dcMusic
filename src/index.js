const Discord = require('discord.js');
const Music = require('./Music');
const usage = require('./Setting/usage');
const playList = require('./PlayList');
const { appendFile } = require('fs');
const setting = require('../config.json');

const client = new Discord.Client();

client.once('ready', () => { console.log('Ready!'); });

client.on('message', async message => {

    if (message.author.bot) { return; }
    if (!message.content.startsWith('!')) { return; }

    // check only checked channel can used;
    const textChannel = message.channel;
    const voiceChannel = message.member.voice.channel;
    if (setting.textChannel && textChannel != setting.textChannel) { return message.channel.send('先加入個語音頻道吧'); }
    if (!voiceChannel) { return message.channel.send('先加入個語音頻道吧'); }

    appendFile('./historylog', ((new Date()).toString() + ', ' + message.author.username + ', ' + message.content + '\n'), err => { if (err) { console.log(err); } })

    if (message.content === '!help') { usage.instruct(message); }
    else if (message.content.startsWith('!play ')) { Music.addMusic(message, setting); }
    else if (message.content.startsWith('!skip')) { Music.skipMusic(message, setting); }
    else if (message.content === '!stop') { Music.stopMusic(message, setting); }
    else if (message.content === '!list') { Music.listMusic(message, setting); }
    else if (message.content.startsWith('!playlist')) { playList.showPlayList(message, setting); }
    else if (message.content.startsWith('!addtolist')) { playList.addMusicToList(message, setting); }
    else if (message.content === '!nowtolist') { playList.nowToList(message, setting); }
});

client.login(process.env.DC_TOKEN);