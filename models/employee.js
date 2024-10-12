const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');

const Employee = sequelize.define('employee', {
    employeeID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, // ตรวจสอบว่าเป็นอีเมลที่ถูกต้อง
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('owner', 'content creater', 'staff'),
        allowNull: false,
        defaultValue: 'owner', // เริ่มต้นบทบาทเป็น owner
    },
}, {
    tableName: 'employee',
    timestamps: true,
});

// แฮชรหัสผ่านก่อนบันทึกข้อมูล
Employee.beforeCreate(async (employee) => {
    const salt = await bcrypt.genSalt(10);
    employee.password = await bcrypt.hash(employee.password, salt);
});

module.exports = Employee;
