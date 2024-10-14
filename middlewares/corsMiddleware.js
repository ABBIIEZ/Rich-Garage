const cors = require('cors');

// กำหนดการตั้งค่า CORS
const corsOptions = {
    origin: '*', // กำหนดให้ทุก domain สามารถเข้าถึงได้ หากต้องการจำกัด origin ก็สามารถแก้ไขได้
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // กำหนด method ที่อนุญาต
    allowedHeaders: ['Content-Type', 'Authorization'], // กำหนด headers ที่อนุญาต
};

module.exports = cors(corsOptions);
