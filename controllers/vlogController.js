const Vlog = require('../models/vlog');

// สร้าง Vlog ใหม่
exports.createVlog = async (req, res) => {
    const { title, url, description, employee_id } = req.body; // ตรวจสอบข้อมูลที่ได้รับ

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!title || !url || !description || !employee_id) {
        return res.status(400).json({ error: 'Please provide all required information.' });
    }

    try {
        const vlog = await Vlog.create(req.body);
        res.status(201).json(vlog);
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// อ่านข้อมูล Vlog ทั้งหมด
exports.getVlogs = async (req, res) => {
    try {
        const vlogs = await Vlog.findAll();
        res.status(200).json(vlogs);
    } catch (err) {
        console.error('Database query error:', err); // แสดงข้อผิดพลาดใน console
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// อ่านข้อมูล Vlog ตาม ID
exports.getVlogById = async (req, res) => {
    try {
        const vlog = await Vlog.findByPk(req.params.id);
        if (!vlog) {
            return res.status(404).json({ error: 'Vlog not found' });
        }
        res.status(200).json(vlog);
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// แก้ไขข้อมูล Vlog
exports.updateVlog = async (req, res) => {
    const { title, url, description, employee_id } = req.body; // ตรวจสอบข้อมูลที่ได้รับ

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!title && !url && !description && !employee_id) {
        return res.status(400).json({ error: 'Please provide at least one field to update.' });
    }

    try {
        const vlog = await Vlog.findByPk(req.params.id);
        if (!vlog) {
            return res.status(404).json({ error: 'Vlog not found' });
        }
        await vlog.update(req.body);
        res.status(200).json(vlog);
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// ลบข้อมูล Vlog (Soft Delete)
exports.deleteVlog = async (req, res) => {
    try {
        const vlog = await Vlog.findByPk(req.params.id);
        if (!vlog) {
            return res.status(404).json({ error: 'Vlog not found' });
        }
        await vlog.destroy(); // ใช้ soft delete
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// อ่านข้อมูล Vlog ที่ถูกลบ (Soft Deleted)
exports.getDeletedVlogs = async (req, res) => {
    try {
        const deletedVlogs = await Vlog.findAll({ paranoid: false }); // ดึงข้อมูลที่ถูกลบ
        res.status(200).json(deletedVlogs);
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};
