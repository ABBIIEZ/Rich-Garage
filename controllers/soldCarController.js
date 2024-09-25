const SoldCar = require('../models/soldCar');

// Get all sold cars
exports.getAllSoldCars = async (req, res) => {
    try {
        const soldCars = await SoldCar.findAll();
        res.json(soldCars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a sold car by ID
exports.getSoldCarById = async (req, res) => {
    try {
        const soldCar = await SoldCar.findByPk(req.params.id);
        if (!soldCar) {
            return res.status(404).json({ message: 'Sold car not found' });
        }
        res.json(soldCar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new sold car record
exports.createSoldCar = async (req, res) => {
    try {
        const { sold_date, Price, car_id } = req.body; // Assuming you have these fields
        const newSoldCar = await SoldCar.create({ sold_date, Price, car_id });
        res.status(201).json(newSoldCar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a sold car by ID
exports.updateSoldCarById = async (req, res) => {
    try {
        const { sold_date, Price, car_id } = req.body; // Assuming you have these fields
        const soldCar = await SoldCar.findByPk(req.params.id);
        if (!soldCar) {
            return res.status(404).json({ message: 'Sold car not found' });
        }
        await soldCar.update({ sold_date, Price, car_id });
        res.json(soldCar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a sold car by ID
exports.deleteSoldCarById = async (req, res) => {
    try {
        const soldCar = await SoldCar.findByPk(req.params.id);
        if (!soldCar) {
            return res.status(404).json({ message: 'Sold car not found' });
        }
        await soldCar.destroy();
        res.json({ message: 'Sold car deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
