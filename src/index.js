const Discord = require('discord.js');
const usage = require('./Setting/usage');
const setting = require('../config.json');
const env = require('../env.json');
const fs = require('fs');
const Music = require('./Music');

const client = new Discord.Client();

client.once('ready', async() => {
    console.log('Ready!');
    setting.textChannel = client.channels.cache.find(channel => channel.name === '🟫歌曲推薦');
    setting.voiceChannel = client.channels.cache.find(channel => channel.name === '🟫DJ放送');
    Music.start(setting);
});

client.on('message', async message => {

    if (message.author.bot) { return; }
    if (message.channel != setting.textChannel) { return; }
    if (!message.content.startsWith('!')) { return; }

    fs.appendFile('./historylog', ((new Date()).toString() + ', ' + message.author.username + ', ' + message.content + '\n'), err => { if (err) { console.log(err); } })

    if (message.content === '!help') { usage.instruct(message); }
    if (message.content === '!play') { Music.play(setting); }
    else if (message.content.startsWith('!play ')) { Music.add(message, setting); }
    else if (message.content === '!skip') { Music.skipMusic(setting); }
    else if (message.content === '!stop') { Music.stop(setting); }
    // else if (message.content === '!list') { Music.listMusic(message, setting); }
});

client.login(env.DC_TOKEN);