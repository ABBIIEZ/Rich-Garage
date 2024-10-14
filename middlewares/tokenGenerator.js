const jwt = require('jsonwebtoken');

// ฟังก์ชันสำหรับสร้าง token
const generateToken = (user) => {
    // สร้าง payload สำหรับ JWT token
    const payload = {
        id: user.id,
        username: user.username
    };

    // สร้าง token โดยใช้ secret key จาก environment variables
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h' // กำหนดเวลาในการหมดอายุของ token เช่น 1 ชั่วโมง

    });


    return token;
};

module.exports = generateToken;
