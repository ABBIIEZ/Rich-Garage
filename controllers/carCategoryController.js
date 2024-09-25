const CarCategory = require('../models/carCategory');

// Get all car categories
exports.getAllCarCategories = async (req, res) => {
    try {
        const categories = await CarCategory.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a car category by ID
exports.getCarCategoryById = async (req, res) => {
    try {
        const category = await CarCategory.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Car category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new car category
exports.createCarCategory = async (req, res) => {
    try {
        const { categoryName } = req.body; // Assuming you have a categoryName field
        const newCategory = await CarCategory.create({ categoryName });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a car category by ID
exports.updateCarCategoryById = async (req, res) => {
    try {
        const { categoryName } = req.body; // Assuming you have a categoryName field
        const category = await CarCategory.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Car category not found' });
        }
        await category.update({ categoryName });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a car category by ID
exports.deleteCarCategoryById = async (req, res) => {
    try {
        const category = await CarCategory.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Car category not found' });
        }
        await category.destroy();
        res.json({ message: 'Car category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
