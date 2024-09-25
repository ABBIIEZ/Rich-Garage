const express = require('express');
const customerController = require('../controllers/customerController');
const router = express.Router();

router.get('/', customerController.getAllCustomers); // Get all customers
router.get('/:id', customerController.getCustomerById); // Get a customer by ID
router.post('/', customerController.createCustomer); // Create a new customer
router.put('/:id', customerController.updateCustomerById); // Update a customer by ID
router.delete('/:id', customerController.deleteCustomerById); // Delete a customer by ID

module.exports = router;
