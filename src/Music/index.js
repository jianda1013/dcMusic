const musicFunc = {};

musicFunc.addMusic = require('./addMusic').AddMusic;
musicFunc.listMusic = require('./listMusic').listMusic;
musicFunc.skipMusic = require('./editMusic').skipMusic;
musicFunc.stopMusic = require('./editMusic').stopMusic;
musicFunc.killAll = require('./editMusic').killAll;

module.exports = musicFunc;