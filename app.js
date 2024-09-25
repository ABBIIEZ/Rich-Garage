const express = require('express');
const { connectDB } = require('./config/db'); // การเชื่อมต่อกับฐานข้อมูล
require('dotenv').config(); // ใช้ dotenv สำหรับโหลดตัวแปร environment

// Import routes
const employeeRoutes = require('./routes/employeeRoutes'); // เส้นทางสำหรับพนักงาน
const carRoutes = require('./routes/carRoutes'); // เส้นทางสำหรับรถยนต์
const customerRoutes = require('./routes/customerRoutes'); // เส้นทางสำหรับลูกค้า
const vlogRoutes = require('./routes/vlogRoutes'); // เส้นทางสำหรับ Vlogs
const websiteTrafficRoutes = require('./routes/websiteTrafficRoutes'); // เส้นทางสำหรับการการเข้าชม
const carCategoryRoutes = require('./routes/carCategoryRoutes'); // เส้นทางสำหรับประเภทของรถ
const soldCarRoutes = require('./routes/soldCarRoutes'); // เส้นทางสำหรับรถที่ขายแล้ว

const app = express();

// Middleware
app.use(express.json()); // สำหรับรับข้อมูล JSON

// Routes
app.use('/api/employees', employeeRoutes); // เส้นทางสำหรับพนักงาน
app.use('/api/cars', carRoutes); // เส้นทางสำหรับรถยนต์
app.use('/api/customers', customerRoutes); // เส้นทางสำหรับลูกค้า
app.use('/api/vlogs', vlogRoutes); // เส้นทางสำหรับ Vlogs
app.use('/api/website-traffic', websiteTrafficRoutes); // เส้นทางสำหรับการการเข้าชม
app.use('/api/car-categories', carCategoryRoutes); // เส้นทางสำหรับประเภทของรถ
app.use('/api/sold-cars', soldCarRoutes); // เส้นทางสำหรับรถที่ขายแล้ว

// Connect to DB and Start Server
connectDB(); // เชื่อมต่อฐานข้อมูล

const PORT = process.env.PORT || 3000; // ตั้งค่าพอร์ต
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // แสดงข้อความเมื่อเซิร์ฟเวอร์เริ่มทำงาน
});

