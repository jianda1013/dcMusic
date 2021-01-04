const playListFunc = {};

playListFunc.showPlayList = require('./playList').showPlayList;
playListFunc.showSongList = require('./playList').showSongList;
playListFunc.addMusicToList = require('./addList').addMusicToList;
playListFunc.nowToList = require('./addList').nowToList;

module.exports = playListFunc;