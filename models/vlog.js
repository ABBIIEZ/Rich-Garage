const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Vlog = sequelize.define('vlog', {
    vlogID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date_posted: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Employee',
            key: 'employeeID',
        },
    },
}, {
    tableName: 'vlog',
    timestamps: true,
    paranoid: true, // เปิดใช้งาน soft delete
});

module.exports = Vlog;
