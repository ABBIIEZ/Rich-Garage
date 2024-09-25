const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const WebsiteTraffic = sequelize.define('WebsiteTraffic', {
    websiteTrafficID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Province: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    page_view_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    car_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Cars',
            key: 'carsID',
        },
    },
    customer_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Customers',
            key: 'customerID',
        },
    },
});

module.exports = WebsiteTraffic;
