const Discord = require('discord.js');

const client = new Discord.Client();
client.login(process.env.DC_TOKEN);

require('./messege.js')(client);
