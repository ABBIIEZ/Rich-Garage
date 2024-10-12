const CarCategory = require('../models/carCategory');
const Car = require('../models/car');

// สร้างหมวดหมู่รถใหม่
exports.createCarCategory = async (req, res) => {
    try {
        const { name } = req.body;

        // ตรวจสอบว่าชื่อหมวดหมู่มีอยู่แล้วหรือไม่
        const existingCategory = await CarCategory.findOne({ where: { name } });
        if (existingCategory) {
            return res.status(400).json({ error: 'Category already exists' });
        }

        const category = await CarCategory.create(req.body);
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// อ่านข้อมูลหมวดหมู่รถทั้งหมด
exports.getCarCategories = async (req, res) => {
    try {
        const categories = await CarCategory.findAll();
        res.status(200).json(categories);
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// อ่านข้อมูลหมวดหมู่รถตาม ID
exports.getCarCategoryById = async (req, res) => {
    try {
        const category = await CarCategory.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Car Category not found' });
        }
        res.status(200).json(category);
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// แก้ไขหมวดหมู่รถ
exports.updateCarCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await CarCategory.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({ error: 'Car Category not found' });
        }

        // ตรวจสอบว่าชื่อใหม่ซ้ำกับหมวดหมู่อื่นหรือไม่
        const existingCategory = await CarCategory.findOne({ where: { name } });
        if (existingCategory && existingCategory.id !== category.id) {
            return res.status(400).json({ error: 'Category name already in use' });
        }

        await category.update(req.body);
        res.status(200).json(category);
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};

// ลบหมวดหมู่รถ
exports.deleteCarCategory = async (req, res) => {
    try {
        const category = await CarCategory.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({ error: 'Car Category not found' });
        }

        // ตรวจสอบว่าหมวดหมู่มีรถที่เชื่อมโยงอยู่หรือไม่
        const carsInCategory = await Car.findAll({ where: { category_id: req.params.id } });
        if (carsInCategory.length > 0) {
            return res.status(400).json({ error: 'Cannot delete category with cars associated' });
        }

        await category.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: 'An error occurred during the operation.' });
    }
};
