const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class song extends Model { };

    song.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        song_name: DataTypes.STRING,
        song_url: DataTypes.STRING,
        list_id: { type: DataTypes.INTEGER, references: { model: 'playList', key: 'id' } },
        create_date: DataTypes.DATE,
    }, {
        timestamps: false,
        sequelize,
        freezeTableName: true,
        modelName: 'song',
    });

    return song;
};