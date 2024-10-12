const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');

const Customer = sequelize.define('customer', {
    customerID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nickName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM('Male', 'Female', 'Other'),
        allowNull: false,
    },
    province: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    language_preference: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'customer',
    timestamps: true,
});

Customer.beforeCreate(async (customer) => {
    const salt = await bcrypt.genSalt(10);
    employee.password = await bcrypt.hash(customer.password, salt);
});

module.exports = Customer;
