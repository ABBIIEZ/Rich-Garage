const express = require('express');
const carCategoryController = require('../controllers/carCategoryController');
const router = express.Router();

router.get('/', carCategoryController.getAllCarCategories); // Get all car categories
router.get('/:id', carCategoryController.getCarCategoryById); // Get a car category by ID
router.post('/', carCategoryController.createCarCategory); // Create a new car category
router.put('/:id', carCategoryController.updateCarCategoryById); // Update a car category by ID
router.delete('/:id', carCategoryController.deleteCarCategoryById); // Delete a car category by ID

module.exports = router;
