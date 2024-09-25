const express = require('express');
const carController = require('../controllers/carController');
const router = express.Router();

router.get('/', carController.getAllCars); // Get all cars
router.get('/:id', carController.getCarById); // Get a car by ID
router.post('/', carController.createCar); // Create a new car
router.put('/:id', carController.updateCarById); // Update a car by ID
router.delete('/:id', carController.deleteCarById); // Delete a car by ID

module.exports = router;
