const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SoldCar = sequelize.define('SoldCar', {
    soldCarID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sold_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    car_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Cars',
            key: 'carsID',
        },
    },
});

module.exports = SoldCar;
