const { Car } = require('../models/car'); // ปรับเส้นทางตามที่สร้างโมเดล Car

// Get all cars
exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.findAll();
        res.json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get a car by ID
exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Create a new car
exports.createCar = async (req, res) => {
    try {
        const newCar = await Car.create(req.body);
        res.status(201).json(newCar);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update a car by ID
exports.updateCarById = async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        await car.update(req.body);
        res.json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete a car by ID
exports.deleteCarById = async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        await car.destroy();
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

