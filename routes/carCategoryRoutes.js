const express = require('express');
const carCategoryController = require('../controllers/carCategoryController');
const router = express.Router();

router.post('/', carCategoryController.createCarCategory);
router.get('/', carCategoryController.getCarCategories);
router.get('/:id', carCategoryController.getCarCategoryById);
router.put('/:id', carCategoryController.updateCarCategory);
router.delete('/:id', carCategoryController.deleteCarCategory);

module.exports = router;
