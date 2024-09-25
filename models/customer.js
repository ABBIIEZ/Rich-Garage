const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Customer = sequelize.define('Customer', {
    customerID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    nickname: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.ENUM('male', 'female', 'other'),
    province: DataTypes.STRING,
    language_preference: DataTypes.STRING
});

module.exports = Customer;
