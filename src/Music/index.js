const musicFunc = {};

musicFunc.addMusic = require('./addMusic').add;
musicFunc.listMusic = require('./listMusic').listMusic;
musicFunc.skipMusic = require('./stopMusic').skipMusic;
musicFunc.stopMusic = require('./stopMusic').stop;
musicFunc.addMusicList = require('./addMusic').addMusicList;

module.exports = musicFunc;