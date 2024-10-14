const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');
const carRoutes = require('./routes/carRoutes');
const carCategoryRoutes = require('./routes/carCategoryRoutes');
const customerRoutes = require('./routes/customerRoutes');
const vlogRoutes = require('./routes/vlogRoutes');
const websiteTrafficRoutes = require('./routes/websiteTrafficRoutes');

// Import middlewares
const authMiddleware = require('./middlewares/authMiddleware');
const loggingMiddleware = require('./middlewares/loggingMiddleware');
const corsMiddleware = require('./middlewares/corsMiddleware');


dotenv.config();

const app = express();
app.use(express.json()); // ใช้เพื่อแปลง JSON request body

// Use CORS middleware
app.use(corsMiddleware);

// Use middlewares
app.use(loggingMiddleware);

// ใช้ authMiddleware กับ routes
app.use('/api/employee', employeeRoutes);
app.use('/api/car', carRoutes);
app.use('/api/carCategory', carCategoryRoutes);
app.use('/api/customer', authMiddleware, customerRoutes);
app.use('/api/vlog', vlogRoutes);
app.use('/api/websiteTraffic', authMiddleware, websiteTrafficRoutes);

// เชื่อมต่อฐานข้อมูล
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// เริ่มต้น server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
