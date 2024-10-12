const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Car = sequelize.define('car', {
    carsID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name_car: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mileage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0 // ต้องมีค่ามากกว่า 0
        }
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    options: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    image_url: {
        type: DataTypes.JSON,   // ใช้ JSON เพื่อเก็บ array ของ URL รูปภาพ
        allowNull: true,
    },
    discounted: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('for sale', 'on sale', 'new arrival'),
        allowNull: false,
        defaultValue: 'for sale',
    },
    newCars: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    arrival_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'CarCategory',
            key: 'carCategoryID',
        },
    },
}, {
    tableName: 'car',
    timestamps: true, // เปิดการใช้งาน timestamps เพื่อสร้าง createdAt และ updatedAt
});

module.exports = Car;
