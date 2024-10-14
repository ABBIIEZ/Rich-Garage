const Employee = require('../models/employee');
const bcrypt = require('bcrypt');
const generateToken = require('../middlewares/tokenGenerator');



// สร้างพนักงานใหม่
exports.createEmployee = async (req, res) => {
    try {
        // ตรวจสอบว่ามีการส่งข้อมูลที่จำเป็นครบหรือไม่
        const { firstname, lastname, email, password, role } = req.body;
        if (!firstname || !lastname || !email || !password || !role) {
            return res.status(400).json({ error: 'Please provide all required fields.' });
        }

        // ตรวจสอบว่ามีพนักงานที่ใช้ email นี้อยู่แล้วหรือไม่
        const existingEmployee = await Employee.findOne({ where: { email } });
        if (existingEmployee) {
            return res.status(400).json({ error: 'Email already exists.' });
        }

        // แฮชรหัสผ่านก่อนบันทึก
        const hashedPassword = await bcrypt.hash(password, 10);
        const employee = await Employee.create({
            ...req.body,
            password: hashedPassword, // บันทึกรหัสผ่านที่ถูกแฮช

        });
        res.status(201).json(employee);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred during the operation.' });
    }
};


// อ่านข้อมูลพนักงานทั้งหมด
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        if (employees.length === 0) {
            return res.status(404).json({ message: 'No employees found' });
        }
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred during the operation.' });
    }
};

// อ่านข้อมูลพนักงานตาม ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred during the operation.' });
    }
};

// แก้ไขข้อมูลพนักงาน
exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // ตรวจสอบว่ามีการส่งรหัสผ่านใหม่หรือไม่ ถ้ามีให้แฮช
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPassword;
        }

        await employee.update(req.body);
        res.status(200).json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred during the operation.' });
    }
};

// ลบข้อมูลพนักงาน
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        await employee.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'An error occurred during the operation.' });
    }
};



// ฟังก์ชันสำหรับการล็อกอินพนักงาน
exports.loginEmployee = async (req, res) => {
    try {
        console.log('Request Body:', req.body); // แสดงข้อมูลที่ส่งมาใน request
        const employee = await Employee.findOne({ where: { email: req.body.email } });
        console.log('Employee Found:', employee); // แสดงข้อมูลพนักงานที่ค้นพบ
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // แสดงรหัสผ่านที่ป้อนเข้ามาและรหัสผ่านที่เก็บไว้ในฐานข้อมูล
        console.log('Plain Password:', req.body.password); // รหัสผ่านที่ป้อนเข้ามา
        console.log('Hashed Password:', employee.password); // รหัสผ่านที่เก็บในฐานข้อมูล

        const match = await bcrypt.compare(req.body.password, employee.password);
        console.log('Password Match:', match); // แสดงผลการเปรียบเทียบ password
        if (!match) {
            return res.status(401).json({ error: 'Invalid password' });
        }


        // สร้าง token โดยใช้ employeeID 
        const token = generateToken({ id: employee.employeeID, username: employee.firstname });
        console.log('Token:', token);

        // ส่งข้อมูลพนักงานและ Token
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred during the operation.' });
    }
};

