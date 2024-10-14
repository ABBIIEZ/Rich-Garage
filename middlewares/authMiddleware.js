const jwt = require('jsonwebtoken');



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
        req.user = decoded.id; // เก็บข้อมูลผู้ใช้ใน request
        next();
    });
};

module.exports = authMiddleware;