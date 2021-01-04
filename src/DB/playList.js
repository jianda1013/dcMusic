const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class playList extends Model { };

    playList.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        list_name: DataTypes.STRING,
        create_date: DataTypes.DATE,
    }, {
        timestamps: false,
        sequelize,
        freezeTableName: true,
        modelName: 'playList',
    });

    return playList;
};