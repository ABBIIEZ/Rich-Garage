const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Car = sequelize.define('Car', {
    carsID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_car: DataTypes.STRING,
    mileage: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    color: DataTypes.STRING,
    options: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    discounted: DataTypes.DECIMAL,
    status: DataTypes.ENUM('available', 'sold'),
    newCars: DataTypes.BOOLEAN,
    arrival_date: DataTypes.DATE,
    category_id: DataTypes.INTEGER
});

module.exports = Car;
