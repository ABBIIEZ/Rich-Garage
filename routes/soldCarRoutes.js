const express = require('express');
const soldCarController = require('../controllers/soldCarController');
const router = express.Router();

router.get('/', soldCarController.getAllSoldCars); // Get all sold cars
router.get('/:id', soldCarController.getSoldCarById); // Get a sold car by ID
router.post('/', soldCarController.createSoldCar); // Create a new sold car record
router.put('/:id', soldCarController.updateSoldCarById); // Update a sold car by ID
router.delete('/:id', soldCarController.deleteSoldCarById); // Delete a sold car by ID

module.exports = router;
