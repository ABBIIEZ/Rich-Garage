const Car = require('../models/car');
const CarCategory = require('../models/carCategory');

// สร้างรถใหม่
exports.createCar = async (req, res) => {
    try {
        const { category_id, ...carData } = req.body;

        // ตรวจสอบว่ามีหมวดหมู่รถ (CarCategory) หรือไม่
        let category = await CarCategory.findByPk(category_id);

        if (!category) {
            // ถ้าไม่มีหมวดหมู่ ให้สร้างใหม่
            category = await CarCategory.create({
                carCategoryID: category_id,
                name: 'New Category', // อาจจะต้องการให้ req.body รับชื่อหมวดหมู่รถจากผู้ใช้
            });
        }

        // สร้างรถใหม่และเชื่อมกับหมวดหมู่
        const car = await Car.create({ ...carData, category_id: category.carCategoryID });
        res.status(201).json(car);
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// อ่านข้อมูลรถทั้งหมด
exports.getCars = async (req, res) => {
    try {
        const cars = await Car.findAll({
            include: CarCategory, // ดึงข้อมูลหมวดหมู่รถด้วย
        });
        res.status(200).json(cars);
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// อ่านข้อมูลรถตาม ID
exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id, {
            include: CarCategory, // ดึงข้อมูลหมวดหมู่รถด้วย
        });
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.status(200).json(car);
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// แก้ไขข้อมูลรถ
exports.updateCar = async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }

        const { category_id, ...carData } = req.body;

        // อัปเดตหมวดหมู่รถ (CarCategory)
        if (category_id) {
            let category = await CarCategory.findByPk(category_id);
            if (!category) {
                // ถ้าไม่มีหมวดหมู่ ให้สร้างใหม่
                category = await CarCategory.create({
                    carCategoryID: category_id,
                    name: 'Updated Category', // เปลี่ยนชื่อหมวดหมู่ตามที่ผู้ใช้ต้องการ
                });
            }
            car.category_id = category.carCategoryID;
        }

        // อัปเดตรถ
        await car.update(carData);
        res.status(200).json(car);
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// ฟังก์ชันเปลี่ยนสถานะรถ
exports.changeCarStatus = async (req, res) => {
    const { status } = req.body;
    const allowedStatuses = ['for sale', 'on sale', 'new arrival'];

    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }

        // ตรวจสอบสถานะที่ส่งมา
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid car status' });
        }

        // เปลี่ยนสถานะรถ
        car.status = status;
        await car.save();

        res.status(200).json({ message: 'Car status updated successfully', car });
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// ลบข้อมูลรถ
exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        await car.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};
