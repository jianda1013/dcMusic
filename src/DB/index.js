const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_TYPE,
    pool: { max: 5, min: 0, idle: 30000 },
    logging: false
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.playList = require('./playList')(sequelize, Sequelize);
db.song = require('./song')(sequelize, Sequelize);

module.exports = db;