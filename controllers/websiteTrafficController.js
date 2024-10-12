const { fn, col } = require('sequelize');
const WebsiteTraffic = require('../models/websiteTraffic');

// ฟังก์ชันบันทึกการเข้าชมรถ
exports.recordTraffic = async (req, res) => {
    try {
        const { carID, province, customerID } = req.body; // ดึงข้อมูลจาก body

        // เช็คดูว่ามีการเข้าชมรถนี้แล้วหรือไม่
        const existingTraffic = await WebsiteTraffic.findOne({
            where: {
                car_id: carID,
                province: province,
                customer_id: customerID,
            }
        });

        if (existingTraffic) {
            // ถ้ามีข้อมูลแล้ว ให้เพิ่มจำนวนการเข้าชม
            existingTraffic.viewCount += 1;
            await existingTraffic.save();
        } else {
            // ถ้ายังไม่มีข้อมูล ให้สร้างข้อมูลใหม่
            await WebsiteTraffic.create({
                car_id: carID,
                province: province,
                customer_id: customerID,
                viewCount: 1,
                timestamp: new Date(),
            });
        }

        res.status(201).json({ message: 'Traffic recorded successfully.' });
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};


// อ่านข้อมูลการเข้าชมเว็บไซต์ทั้งหมด
exports.getWebsiteTraffic = async (req, res) => {
    try {
        const traffic = await WebsiteTraffic.findAll();
        res.status(200).json(traffic);
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// อ่านข้อมูลการเข้าชมเว็บไซต์ตาม ID
exports.getWebsiteTrafficById = async (req, res) => {
    try {
        const traffic = await WebsiteTraffic.findByPk(req.params.id);
        if (!traffic) {
            return res.status(404).json({ error: 'Website Traffic not found' });
        }
        res.status(200).json(traffic);
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// แก้ไขข้อมูลการเข้าชมเว็บไซต์
exports.updateWebsiteTraffic = async (req, res) => {
    try {
        const traffic = await WebsiteTraffic.findByPk(req.params.id);
        if (!traffic) {
            return res.status(404).json({ error: 'Website Traffic not found' });
        }
        await traffic.update(req.body);
        res.status(200).json(traffic);
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// ลบข้อมูลการเข้าชมเว็บไซต์
exports.deleteWebsiteTraffic = async (req, res) => {
    try {
        const traffic = await WebsiteTraffic.findByPk(req.params.id);
        if (!traffic) {
            return res.status(404).json({ error: 'Website Traffic not found' });
        }
        await traffic.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};


// ฟังก์ชันเพื่อดูรถคันไหนมียอดเข้าดูเยอะที่สุด
exports.getMostViewedCar = async (req, res) => {
    try {
        const mostViewedCar = await WebsiteTraffic.findOne({
            attributes: ['car_id', [fn('SUM', col('viewCount')), 'totalViews']],
            group: ['car_id'],
            order: [[fn('SUM', col('viewCount')), 'DESC']],
            limit: 1
        });
        res.status(200).json(mostViewedCar);
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// ฟังก์ชันเพื่อดูกลุ่มเป้าหมายที่เข้ามาชมเว็บไซต์
exports.getTargetAudience = async (req, res) => {
    try {
        const targetAudience = await WebsiteTraffic.findAll({
            attributes: ['customer_id', [fn('COUNT', col('customer_id')), 'viewCount']],
            group: ['customer_id'],
            order: [[fn('COUNT', col('customer_id')), 'DESC']]
        });
        res.status(200).json(targetAudience);
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// ฟังก์ชันเพื่อดูจังหวัดที่เข้ามาดูเว็บไซต์มากที่สุด
exports.getMostActiveProvince = async (req, res) => {
    try {
        const mostActiveProvince = await WebsiteTraffic.findOne({
            attributes: ['province', [fn('COUNT', col('province')), 'visitCount']],
            group: ['province'],
            order: [[fn('COUNT', col('province')), 'DESC']],
            limit: 1
        });
        res.status(200).json(mostActiveProvince);
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// ฟังก์ชันเพื่อดูจำนวนรถที่เข้ามา
exports.getCarVisitCount = async (req, res) => {
    try {
        const carVisitCount = await WebsiteTraffic.count({
            distinct: true,
            col: 'car_id'
        });
        res.status(200).json({ count: carVisitCount });
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};