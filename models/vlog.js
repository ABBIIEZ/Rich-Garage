const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Vlog = sequelize.define('Vlog', {
    vlogID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    date_posted: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    employee_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Employees',
            key: 'employeeID',
        },
    },
});

module.exports = Vlog;
