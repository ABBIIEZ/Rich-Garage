const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const WebsiteTraffic = sequelize.define(' website_traffic', {
    websiteTrafficID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    province: {
        type: DataTypes.STRING,
        allowNull: false, // จังหวัดที่เข้าชม
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false, // เวลาที่เข้าชม 
        defaultValue: DataTypes.NOW // กำหนดให้ใช้เวลาปัจจุบันเมื่อสร้างข้อมูลใหม่
    },
    viewCount: {
        type: DataTypes.INTEGER,
        defaultValue: 1, // จำนวนการเข้าชม 
    },
    page_view_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    car_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Car', // ชื่อรถยนต์
            key: 'carID',
        },
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Customer', // ชื่อลูกค้า
            key: 'customerID',
        },
    },
}, {
    tableName: ' website_traffic',
    paranoid: true, // เปิดใช้งาน soft delete
});

module.exports = WebsiteTraffic;
