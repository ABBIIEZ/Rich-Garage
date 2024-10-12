const Customer = require('../models/customer');
const bcrypt = require('bcrypt');

// สร้างลูกค้าใหม่
exports.createCustomer = async (req, res) => {
    const { email, password } = req.body;

    // ตรวจสอบข้อมูลที่ต้องการก่อนบันทึก
    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide all required information.' });
    }

    try {
        // ตรวจสอบว่ามี email ซ้ำหรือไม่
        const existingCustomer = await Customer.findOne({
            where: { email }
        });

        if (existingCustomer) {
            // ถ้ามีข้อมูลซ้ำ ให้ส่งข้อผิดพลาดกลับไป
            return res.status(400).json({ error: 'This email is already in use.' });
        }

        // แฮชรหัสผ่านก่อนบันทึก
        const hashedPassword = await bcrypt.hash(password, 10);

        // ถ้าไม่มีข้อมูลซ้ำ ให้สร้างลูกค้าใหม่
        const customer = await Customer.create({ ...req.body, password: hashedPassword });
        res.status(201).json(customer);

    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// ฟังก์ชันสำหรับการล็อกอินลูกค้า
exports.loginCustomer = async (req, res) => {
    const { email, password } = req.body;

    // ตรวจสอบข้อมูลที่ต้องการก่อนล็อกอิน
    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password.' });
    }

    try {
        // ค้นหาลูกค้าตามอีเมล
        const customer = await Customer.findOne({ where: { email } });

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found.' });
        }

        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }

        // หากล็อกอินสำเร็จ
        res.status(200).json({ message: 'Login successful', customer });
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// อ่านข้อมูลลูกค้าทั้งหมด
exports.getCustomer = async (req, res) => {
    try {
        const customers = await Customer.findAll(); // ดึงข้อมูลลูกค้าทั้งหมด
        if (customers.length === 0) { // ตรวจสอบว่ามีลูกค้าหรือไม่
            return res.status(404).json({ message: 'No customers found' });
        }
        res.status(200).json(customers); // ส่งข้อมูลลูกค้า
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' }); // ส่งข้อผิดพลาดถ้ามี
    }
};

// อ่านข้อมูลลูกค้าตาม ID
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// แก้ไขข้อมูลลูกค้า
exports.updateCustomer = async (req, res) => {
    const { email } = req.body;
    try {
        const existingCustomer = await Customer.findOne({
            where: { email: email }
        });

        if (existingCustomer) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const customer = await Customer.findByPk(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        await customer.update(req.body);
        res.status(200).json(customer);
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// ลบข้อมูลลูกค้า
exports.deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        await customer.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};
