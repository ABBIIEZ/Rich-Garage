const Employee = require('../models/employee');
const bcrypt = require('bcrypt');

// สร้างพนักงานใหม่
exports.createEmployee = async (req, res) => {
    try {
        // ตรวจสอบว่ามีการส่งข้อมูลที่จำเป็นครบหรือไม่
        const { firstname, lastname, email, password, role } = req.body;
        if (!firstname || !lastname || !email || !password || !role) {
            return res.status(400).json({ error: 'Please provide all required fields.' });
        }


        // แฮชรหัสผ่านก่อนบันทึก
        const hashedPassword = await bcrypt.hash(password, 10);
        const employee = await Employee.create({
            ...req.body,
            password: hashedPassword, // บันทึกรหัสผ่านที่ถูกแฮช
        });
        res.status(201).json(employee);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// อ่านข้อมูลพนักงานทั้งหมด
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.status(200).json(employees);
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
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
        res.status(400).json({ error: 'An error occurred during the operation.' });
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
        res.status(400).json({ error: 'An error occurred during the operation.' });
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
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// ฟังก์ชันสำหรับเข้าสู่ระบบ
exports.loginEmployee = async (req, res) => {
    try {
        const employee = await Employee.findOne({ where: { email: req.body.email } });
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // ตรวจสอบรหัสผ่าน
        const match = await bcrypt.compare(req.body.password, employee.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // ถ้ารหัสผ่านถูกต้อง สามารถส่งข้อมูลพนักงานหรือ Token ได้ที่นี่
        res.status(200).json({ message: 'Login successful', employee });
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};
