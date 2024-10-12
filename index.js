// index.js
const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');
const carRoutes = require('./routes/carRoutes');
const carCategoryRoutes = require('./routes/carCategoryRoutes');
const customerRoutes = require('./routes/customerRoutes');
const vlogRoutes = require('./routes/vlogRoutes');
const websiteTrafficRoutes = require('./routes/websiteTrafficRoutes');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
app.use(express.json()); // ใช้เพื่อแปลง JSON request body

// Middleware สำหรับ logging request
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
});

// Middleware สำหรับตรวจสอบ authentication
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // ใช้ช่องว่างเป็นตัวแบ่งผลลัพธ์จะเป็น array ของ string ที่แยกออกมาจากข้อความ และเข้าถึงตำแหน่งที่ 1 ของ array <token>
    if (!token) {
        return res.status(403).json({ message: 'No token provided!' });
    }

    // ตรวจสอบ token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        req.user = decoded; // เก็บข้อมูลผู้ใช้ใน request
        next();
    });
};

// ใช้ authMiddleware กับ routes 
app.use('/api/employee', authMiddleware, employeeRoutes);
app.use('/api/car', carRoutes);
app.use('/api/carCategory', carCategoryRoutes);
app.use('/api/customer', authMiddleware, customerRoutes);
app.use('/api/vlog', vlogRoutes);
app.use('/api/websiteTraffic', authMiddleware, websiteTrafficRoutes);

// เชื่อมต่อฐานข้อมูล
sequelize.authenticate()
    .then(() => console.log('Database connected...')) // แสดงข้อความเมื่อเชื่อมต่อสำเร็จ
    .catch(err => console.log('Error: ' + err)); // แสดงข้อผิดพลาดเมื่อไม่สามารถเชื่อมต่อได้

// เริ่มต้น server
const post = process.env.post || 3000;
app.listen(post, () => {
    console.log(`Server running on port ${post}`);
});
