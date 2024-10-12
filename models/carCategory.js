const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CarCategory = sequelize.define('car_category', {
    carCategoryID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'car_category',
    timestamps: true,
});

module.exports = CarCategory;
