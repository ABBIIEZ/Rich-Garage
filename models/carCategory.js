const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CarCategory = sequelize.define('CarCategory', {
    carCategoryID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = CarCategory;
