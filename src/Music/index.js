const musicFunc = {};

musicFunc.add = require('./addMusic').add;
musicFunc.addMusicList = require('./addMusic').addMusicList;
musicFunc.addMusicURL = require('./addMusic').addMusicURL;
musicFunc.addMusicTitle = require('./addMusic').addMusicTitle;
musicFunc.listMusic = require('./listMusic').listMusic;
musicFunc.skipMusic = require('./stopMusic').skipMusic;
musicFunc.stopMusic = require('./stopMusic').stop;

module.exports = musicFunc;